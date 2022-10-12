const express = require("express")
const router = express.Router()
const { createcomment, updateComment, findAllComent, deleteComment, findSingleComent } = require("../controller/commentConroller")
const  requirePass  = require("../middleware/requirePass")


router.use(requirePass)

router.post("/comment", createcomment)
router.get("/", findAllComent)
router.get("/single/:id", findSingleComent)
router.patch("/update/:id", updateComment)
router.delete("/delete/:id", deleteComment)


module.exports = router