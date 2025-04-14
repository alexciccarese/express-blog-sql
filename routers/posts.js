const express = require('express')
const router = express.Router()
const posts = require('../data/menu')
const postsController = require('../controllers/postsController')

//index
router.get('/', postsController.index)

//store
router.get('/:id', postsController.show)

//ceate
router.post('/', postsController.store)

//update
router.put('/:id', postsController.update)

//delete
router.delete('/:id', postsController.destroy)

module.exports = router