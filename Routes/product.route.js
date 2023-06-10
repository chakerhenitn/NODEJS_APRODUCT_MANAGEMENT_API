const expess = require('express')
const router = expess.Router();

const ProducController = require('../Controllers/Product.Controller')

//All routes
router.get('/', ProducController.getAllProducts)
router.post('/', ProducController.createNewProduct) 
router.get('/:id', ProducController.findProductById)
router.patch('/:id', ProducController.UpdateProduct),
router.delete('/:id', ProducController.deleteProduct)


module.exports = router;