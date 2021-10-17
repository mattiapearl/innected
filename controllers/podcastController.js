const Episode = require("../models/episode");
const glob = require("glob");
const { response } = require("express");

//Main Podcast Page
const podcast_index = (req, res) => {
	Episode.find()
		.sort({ createdAt: -1 })
		.limit(1)
		.then((result) => {
			const link = result[0].seoHandle;
			res.redirect(`/podcast/${link}`);
			// res.render("podcast/podcast", {
			// 	title: `${latest.seoTitle} | Innected`,
			// 	list,
			// 	podcast: latest,
			// 	link: "/podcast",
			// });
		})
		.catch((err) => {
			console.log(err);
		});
};

//Podcast Detailed page
const podcast_details = (req, res) => {
	const seoHandle = req.params.seoHandle;
	// Lista episodi
	Episode.find()
		.sort({ createdAt: -1 })
		.then((arrayOfResults) => {
			const list = arrayOfResults.map((elementOfResults) => {
				return {
					tabName: elementOfResults.tabName,
					link: elementOfResults.seoHandle,
				};
			});
			Episode.find({ seoHandle })
				.then((arrayOfEpisodes) => {
					const episode = arrayOfEpisodes[0];
					res.render("podcast/details", {
						podcast: episode,
						list,
						title: `${episode.seoTitle} | Innected`,
						link: `/podcast/${seoHandle}`,
					});
				})
				.catch((err) => {
					res.status(404).render("404", {
						title: "404 | Innected",
						link: "/404",
					});
				});
		});
	// Episodio mostrato
};

//
const podcast_create_get = (req, res) => {
	//Crawls image folder to find all filenames
	const files = glob.sync("*", { cwd: "./public/content/podcast/" });
	res.render("podcast/podcastcreate", {
		title: "Admin - Create Podcast | Innected",
		link: "/podcast/create",
		files: files,
		csrfToken: req.csrfToken(),
	});
};

const podcast_create_post = (req, res) => {
	const data = req.body;
	const episode = new Episode({
		tabName: data.tabName,
		nr: data.nr,
		mainGuest: data.mainGuest,
		title: data.title,
		description: data.description.split("<br>"),
		youtubeLink: data.youtubeLink,
		spotiLink: data.spotiLink,
		appleLink: data.appleLink,
		participants: data.participants.split(";"),
		pRoles: data.pRoles.split(";"),
		tags: data.tags.split(";"),
		img: data.img,
		linkNames: data.linkNames.split(";"),
		links: data.links.split(";"),
		seoHandle: data.seoHandle,
		seoTitle: data.seoTitle,
	});
	episode
		.save()
		.then((result) => {
			res.redirect("/podcast");
		})
		.catch((err) => console.log(err));
};

const podcast_delete = (req, res) => {
	const id = req.params.id;
	Episode.findByIdAndDelete(id)
		.then((result) => {
			res.json({ redirect: "/create" });
		})
		.catch((err) => console.log(err));
};

module.exports = {
	podcast_index,
	podcast_details,
	podcast_create_get,
	podcast_create_post,
	podcast_delete,
};
