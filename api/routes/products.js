const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Product = require('../models/product');

/**
 * @api {get} /products/ Get All Products
 * @apiName GetAllProducts
 * @apiGroup Product
 * @apiVersion 1.0.0
 *
 * @apiSuccess {Number} count Number of existing products.
 * @apiSuccess {Object} users  List of all products.
 */
router.get('/',async (req,res) => {
    Product.find()
        .select('name price _id')
        .exec()
        .then(doc => {
            console.log(doc);
            res.status(200).json({
                count : doc.length,
                products : doc.map(item =>{
                    return {
                        name : item.name,
                        price : item.price,
                        _id : item._id
                    }
                })
            });
        })
        .catch(err=>{
            console.log(err);
            res.status(500).json({error:err});
        })
});

/**
 * @api {post} /products/ Create Product
 * @apiName CreateProduct
 * @apiGroup Product
 * @apiVersion 1.0.0
 *
 * @apiParam {String} name Product's name.
 * @apiParam {Number} price Product's price.
 *
 * @apiSuccess {String} product Created product's ID.
 * @apiSuccess {String} name Created product's name.
 * @apiSuccess {Number} price Created product's price.
 */
router.post('/',async (req,res) => {
    const product = new Product({
        _id: new mongoose.Types.ObjectId(),
        name : req.body.name,
        price : req.body.price
    });
    product.save().then( doc => {
        res.status(200).json(doc);
    }).catch(err =>{
        res.status(500).json({
            error: err
        });
    })
});

/**
 * @api {get} /products/:id Get Product
 * @apiName GetProduct
 * @apiGroup Product
 * @apiVersion 1.0.0
 *
 * @apiParam {String} id Product's id.
 *
 * @apiSuccess {String} product Created product's ID.
 * @apiSuccess {String} name Created product's name.
 * @apiSuccess {Number} price Created product's price.
 */
router.get('/:id',async (req,res) => {
    let id = req.params.id;
    Product.findById(id).exec().then(doc => {
        if (doc) {
            res.status(200).json(doc);
        } else {
            res.status(404).json({
                message: 'Product not found.'
            });
        }
    }).catch( err => {
        res.status(500).json({
            error: err
        });
    })
});

/**
 * @api {patch} /products/:id Patch Product
 * @apiName PatchProduct
 * @apiGroup Product
 * @apiVersion 1.0.0
 *
 * @apiParam {String} id Product's id.
 *
 * @apiSuccess {String} message Success message.
 */
router.patch('/:id',async (req,res) => {
    let _id = req.params.id;
    Product.update({_id}, req.body).exec().then(doc => {
        res.status(200).json(doc);
    }).catch(err => {
        res.status(500).json({
            error: err
        });
    })
});

/**
 * @api {delete} /products/:id Delete Product
 * @apiName DeleteProduct
 * @apiGroup Product
 * @apiVersion 1.0.0
 *
 * @apiParam {String} id Product's id.
 *
 * @apiSuccess {String} message Success message.
 */
router.delete('/:id',async (req,res) => {
    let id = req.params.id;
    Product.deleteOne({_id : id}).exec().then (doc => {
        res.status(200).json(doc);
    }).catch(err => {
        res.status(500).json({
            message: err
        });
    });
});

module.exports = router;
