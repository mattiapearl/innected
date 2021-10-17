const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//Create schema that defines the structure
const episodeSchema = new Schema(
	{
		tabName: { type: String, required: true },
		nr: { type: String, required: true },
		mainGuest: { type: String, required: true },
		title: { type: String, required: true },
		description: Array,
		youtubeLink: { type: String, required: true },
		spotiLink: String,
		appleLink: String,
		participants: Array,
		pRoles: Array,
		tags: Array,
		img: { type: String, required: true },
		linkNames: Array,
		links: Array,
		seoHandle: { type: String, required: true },
		seoTitle: { type: String, required: true },
	},
	{ timestamps: true }
);

//fire a function after something has been saved (in a middleware form)
// userSchema.post("save", function (doc, next) {
// 	//Save = Event, doc = saved element, next = move on
// 	console.log("New user was Created and Saved", doc);
// 	next(); //Like middleware we need to go on with the code
// });

//CREATE MODEL: Pass collection and then schema (Name = singular of collection name)
const Episode = mongoose.model("podcast-episode", episodeSchema); //it will look for podcast-episodeS (s not capital)
module.exports = Episode;
