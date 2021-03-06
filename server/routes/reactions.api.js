var express = require("express");
var router = express.Router();

const authMiddleware = require("../middlewares/authentication");
const reactionsController = require("../controllers/reactions.controller");

router.gepostt("/", authMiddleware.loginRequired, reactionsController.create);
// router.get("/", reactionsController.list);
// router.delete("/:id", reactionsController.destroy);

module.exports = router;
