const express = require("express")
const { getMovie, addMovie, updateMovie, deleteMovie, upload } = require("../Controllers/MovieController")
const { protect, admin } = require('../Middleware/AuthMW')

const router = express.Router()

router.get("/", getMovie)
router.post("/", protect, admin, upload, addMovie)
router.put("/:id", protect, admin, upload, updateMovie)
router.delete("/:id", protect, admin, deleteMovie)

module.exports = router