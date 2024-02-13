const { isObjectIdOrHexString } = require('mongoose');
const ProductModel= require('../models/product.model');

const addProduct=async(req,res)=>{
    try {
        const {name,price,description,quantity}= req.body;
        const picture=req.file.path;
        const path = picture.split('\\')[1];
        const newProduct= new ProductModel({name,price,description,quantity,picture:path});
        await newProduct.save();

        res.status(201).json({message:"Product Added"})
    } catch (error) {
        res.status(400).json({message:"All fields are required" || error})
    }
}
const getAllProducts=async(req,res)=>{
    try {
        const data= await ProductModel.find();
        res.status(200).send(data);
    } catch (error) {
        res.status(500).send({message:"innternal Error Occured"})
    }
}
const searchProduct=async(req,res)=>{
    const query= req.query.q;
    if(!query){
        return res.status(400).json({error:"Please provide a Search Query"})
    }
    try {
        const data= await ProductModel.find({
            $or:[
                {name:{$regex:query,$options:'i'}},
                {description:{$regex:query,$options:'i'}}
            ]
        });
        res.status(200).send(data);
    } catch (error) {
        res.status(500).send({message:"innternal Error Occured"})
    }
}
const getProductById=async(req,res)=>{
    try {
        const _id = req.params.id;
        const data= await ProductModel.findOne({_id});
        if(data === null)return res.status(404).send({message:"Please provide a Product"});
        res.status(200).send(data);
    } catch (error) {
        res.status(500).send({message:"innternal Error Occured"});
    }
}

// const filterProduct=async(req,res)=>{
//     let filters= req.query;
//     console.log(filters);
//     let priceRange={};
//     if(filters.minPrice!==undefined || filters.maxPrice!==undefined){
//         priceRange.$gte=parseInt(filters.minPrice);
//         priceRange.$lte=parseInt(filters.maxPrice);
//     }
//     try {
//         let query={}
//         if(Object.keys(priceRange).length>0){
//             query.price=priceRange;
//         }
//         console.log(query);
//         const results= await ProductModel.find(query);  {taught by interS} 
//         res.send(results)
//     } catch (error) {
//         console.log(error);
//         res.status(500).send({message:"Error occured"})
//     }
// }
const filterProduct=async(req,res)=>{
    const priceRange = req.body.priceRange;
    try {
        const data = await ProductModel.find({
            price:{
                $gte: priceRange.min,
                $lte: priceRange.max
            }
        });
        if(data.length === 0) return res.status(404).send({message:"Product not found"});
        res.status(200).send(data);
    } catch (error) {
        res.status(500).send({message:"internal error occured"});
    }
    
};

const update = async (req, res)=>{
    const _id = req.params.id;
    try {
        const data = await ProductModel.findOne({_id});
        if(!data) return res.status(404).send({message:"Product not found"});
        data.price = req.body.price;
        data.description = req.body.description;
        await ProductModel.findByIdAndUpdate({_id:data._id}, data);
        res.status(200).send({message:"Product updated"});
    } catch (error) {
        res.status(500).send({message:"internal erroe"});
    }
};

const deleteById = async (req, res)=>{
    const _id = req.params.id;
    try {
        const data = await ProductModel.findOne({_id});
        if(!data) return res.status(404).send({message:"Product not found"});
        await ProductModel.deleteOne({_id});
        res.status(200).send({message:"Product deleted successfully"});
    } catch (error) {
        res.status(500).send({message:"internal error"});
    }
};


module.exports={addProduct,getAllProducts,getProductById,
    searchProduct,filterProduct, update, deleteById}