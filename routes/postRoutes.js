const router = require("express").Router();
const auth = require("../middleware/auth");
const adminOnly = require("../middleware/adminOnly");
const post = require("../controllers/postController");

// public
router.get("/", post.getAll);
router.get("/:id", post.getOne);

// admin only
router.post("/", auth, adminOnly, post.create);
router.put("/:id", auth, adminOnly, post.update);
router.delete("/:id", auth, adminOnly, post.remove);

module.exports = router;
