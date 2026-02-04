const router = require("express").Router();
const auth = require("../middleware/auth");
const adminOnly = require("../middleware/adminOnly");
const comment = require("../controllers/commentController");

// public
router.get("/", comment.getAll);
router.get("/:id", comment.getOne);

// admin only
router.post("/", auth, adminOnly, comment.create);
router.put("/:id", auth, adminOnly, comment.update);
router.delete("/:id", auth, adminOnly, comment.remove);

module.exports = router;
