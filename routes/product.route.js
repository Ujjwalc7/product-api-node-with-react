const express= require('express');
const upload = require('../middlewares/fileupload');
const { addProduct, getAllProducts, getProductById, deleteById } = require('../controllers/product.controller');

const router= express.Router();

router.post('/',upload.single('picture'),addProduct)
router.get('/',getAllProducts);
router.get('/:id',getProductById);
router.delete('/:id',deleteById)
// router.get("/search",searchDemo)

module.exports=router