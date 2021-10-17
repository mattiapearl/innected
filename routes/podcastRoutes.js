const { Router } = require("express");
const podcastController = require("../controllers/podcastController");
const { upload_file_podcast } = require("../controllers/uploadController");
const csrf = require("csurf");
const { requireAdmin } = require("../middleware/authMiddleware");

const router = Router();
const csrfProtection = csrf({ cookie: true });

//Podcast page render
router.get("/", podcastController.podcast_index);
//Create page render
router.get(
	"/create",
	requireAdmin,
	csrfProtection,
	podcastController.podcast_create_get
);

//Blog page render
router.get("/:seoHandle", podcastController.podcast_details);

//////////////////
// Post Requests//
//////////////7///

//Create episode
router.post(
	"/",
	csrfProtection,
	requireAdmin,
	podcastController.podcast_create_post
);

// Upload file
router.post(
	"/create/upload",
	csrfProtection,
	requireAdmin,
	upload_file_podcast
);

// Delete Requests
// router.delete("/podcast/:id", podcastController.podcast_delete);

module.exports = router;
