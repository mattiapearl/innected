const bluebird = require("bluebird");
const { resolveSoa } = require("dns");
const e = require("express");
const formidable = require("formidable");
const fs = bluebird.promisifyAll(require("fs"));

//Returns true or false depending on whether it managed to check the folder or not
async function checkCreateUploadsFolder(uploadFolder) {
	try {
		console.log(`> Checking presence of "${uploadFolder}" folder...`);
		await fs.statAsync(uploadFolder);
	} catch (e) {
		console.log("> Folder doesn't exist, creating it...");
		//Folder doesn't exist
		if (e && e.code == "ENOENT") {
			try {
				console.log("> Trying to create the folder...");
				await fs.mkdirSync(uploadFolder);
			} catch (e) {
				console.log(`> Error Creating the "${uploadFolder}" Folder`);
				return false;
			}
			console.log("> Folder Created");
		} else {
			console.log("> Error Reading the Uploads Folder");
			return false;
		}
	}
	console.log(`> "${uploadFolder}" is OK`);
	return true;
}

//Returns true or false in case of success
function checkFileTypeImg(file) {
	console.log("> Checking file type...");
	const type = file.type.split("/").pop(); //file: img/png -> split and pop first element
	console.log(`> File type was "${type}"`);
	const validTypes = ["png", "jpeg", "webp", "jpg"];
	if (validTypes.indexOf(type) == -1) {
		console.log("> This file type is invalid");
		return false;
	}
	console.log("> This type is valid");
	return true;
}

module.exports.upload_file_podcast = async (req, res) => {
	console.log("\n- Upload Sequence Initiated -\n");
	const form = formidable.IncomingForm();
	const uploadFolder = "./public/content/podcast/";
	const tempFolder = "./public/content/temp";
	form.maxFileSize = 2 * 1024 * 1024;
	//Temp files
	form.uploadDir = tempFolder;
	console.log(`> Trying upload with Upload Folder: "${uploadFolder}"`);
	//Check temp folder
	const tempExists = await checkCreateUploadsFolder(tempFolder);
	if (!tempExists) {
		try {
			await fs.unlinkSync(file.path);
		} catch (e) {
			console.log("> Couldn't remove the temp file, contact mattia", e);
		}
		return res.json({
			ok: false,
			msg: "There was an error creating the temp folder",
		});
	}
	//Check upload folder
	const folderExists = await checkCreateUploadsFolder(uploadFolder);
	if (!folderExists) {
		return res.json({
			ok: false,
			msg: "There was an error creating the uploads folder",
		});
	}
	form.parse(req, async (err, fields, files) => {
		//Err checks the error, Fields contains metadata and text, files is the interesting file
		if (err) {
			console.log("> Error Parsing the FIles");
			return res.json({
				ok: false,
				msg: "Error Parsing the FIles",
			});
		}
		if (!files.file.lenght) {
			// There is only one file
			const file = files.file;

			//Check file extension
			const isValid = checkFileTypeImg(file);
			if (!isValid) {
				console.log("> Deleting temp file and ending request");
				fs.unlink(file.path, (err) => {
					if (err)
						console.log(
							"> Couldn't remove the temp file, contact mattia\nERR: " + e
						);
					console.log("> Temp file deleted succesfully");
				});
				return res.json({
					ok: false,
					msg: "The file saved is not an image",
				});
			}

			//Check file name and fixes it
			console.log(`>Checking file name\n - Current: ${file.name}`);
			const fileName = encodeURIComponent(
				file.name.replace(/[\ ,:-]+/g, "-").toLowerCase()
			);
			console.log(`> Renaming file as: ${fileName}`);
			//////////
			//Upload//
			//////////
			try {
				//Take temp file and place it in the uploadFolder
				console.log("> Controls passed, uploading file");
				await fs.renameSync(file.path, uploadFolder + fileName);
			} catch (e) {
				//Delete temp file
				console.log(
					"> The file upload failed, trying to remove the temporary file..."
				);
				//Try to remove temp file
				try {
					await fs.unlinkSync(file.path);
				} catch (e) {
					console.log("> Couldn't remove the temp file, contact mattia", e);
				}
				console.log("> Ending process with error\n");
				return res.json({
					ok: false,
					msg: "The file saved is not an image",
				});
			}
			console.log("> Ending process with success\n");
			return res.status(200).json({
				ok: true,
				msg: "File uploaded correctly",
				fileName: fileName,
			});
		} else {
			//There are multiple files
			return res.json({
				ok: false,
				msg: "Please upload one file at a time",
			});

			// check https://www.youtube.com/watch?v=jtCfvuMRsxE&t for tutorial: Change form value, change iteration value.
			// for (i of files.file) {
			// 	const file = i;

			// 	//Check file extension
			// 	const isValid = checkFileTypeImg(file);
			// 	if (!isValid) {
			// 		console.log("> Deleting temp file and ending request");
			// 		fs.unlink(file.path, (err) => {
			// 			if (err)
			// 				console.log(
			// 					"> Couldn't remove the temp file, contact mattia\nERR: " + e
			// 				);
			// 			console.log("> Temp file deleted succesfully");
			// 		});
			// 		return res.json({
			// 			ok: false,
			// 			msg: "The file saved is not an image",
			// 		});
			// 	}

			// 	//Check file name and fixes it
			// 	console.log(`>Checking file name\n - Current: ${file.name}`);
			// 	const fileName = encodeURIComponent(
			// 		file.name.replace(/[\ ,:-]+/g, "-").toLowerCase()
			// 	);
			// 	console.log(`> Renaming file as: ${fileName}`);
			// 	//////////
			// 	//Upload//
			// 	//////////
			// 	try {
			// 		//Take temp file and place it in the uploadFolder
			// 		console.log("> Controls passed, uploading file");
			// 		await fs.renameSync(file.path, uploadFolder + fileName);
			// 	} catch (e) {
			// 		//Delete temp file
			// 		console.log(
			// 			"> The file upload failed, trying to remove the temporary file..."
			// 		);
			// 		//Try to remove temp file
			// 		try {
			// 			await fs.unlinkSync(file.path);
			// 		} catch (e) {
			// 			console.log("> Couldn't remove the temp file, contact mattia", e);
			// 		}
			// 		console.log("> Ending process with error\n");
			// 		return res.json({
			// 			ok: false,
			// 			msg: "The file saved is not an image",
			// 		});
			// 	}
			// }
		}
	});
};
