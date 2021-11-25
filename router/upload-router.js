const router = require('express').Router()
const uploadController = require('../controller/upload-controller')
const upload = require('../middleware/upload')

router.post('/', upload, uploadController.upload)

module.exports = router