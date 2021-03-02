var express = require("express");
var router = express.Router();

const authMiddleware = require("../middlewares/authentication");
const postsController = require("../controllers/posts.controller");

router.get("/", postsController.list);
router.post("/", authMiddleware.loginRequired, postsController.create);
router.get("/:id", postsController.read);
router.put("/:id", postsController.update);
router.delete("/:id", postsController.destroy);

module.exports = router;