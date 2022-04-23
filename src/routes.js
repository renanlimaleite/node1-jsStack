const { Router } = require('express')
const router = Router()

const ContactController = require('./app/controllers/ContactController')
const CategorieController = require('./app/controllers/CategorieController')

router.get('/contacts', ContactController.index)
router.post('/contacts', ContactController.store)
router.put('/contacts/:id', ContactController.update)
router.get('/contacts/:id', ContactController.show)
router.delete('/contacts/:id', ContactController.delete)

router.get('/categories', CategorieController.index)
router.post('/categories', CategorieController.store)
router.put('/categories/:id', CategorieController.update)
router.get('/categories/:id', CategorieController.show)
router.delete('/categories/:id', CategorieController.delete)

module.exports = router
