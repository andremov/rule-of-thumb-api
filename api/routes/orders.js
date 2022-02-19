const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Order = require('../models/order');
const Product = require('../models/product');

/**
 * @api {get} /orders/ Get All Orders
 * @apiName GetAllOrders
 * @apiGroup Order
 * @apiVersion 1.0.0
 *
 * @apiSuccess {Number} count Number of existing orders.
 * @apiSuccess {Object} users  List of all orders.
 */
router.get('/',async (req,res) => {
    Order.find().exec().then(docs => {
        res.status(200).json({
            count : docs.length,
            orders : docs
        })
    }).catch(err => {
        res.status(500).json({
            error: err
        })
    });
});

/**
 * @api {post} /orders/ Create Order
 * @apiName CreateOrder
 * @apiGroup Order
 * @apiVersion 1.0.0
 *
 * @apiParam {String} name Order's name.
 * @apiParam {Number} price Order's price.
 *
 * @apiSuccess {String} order Created order's ID.
 * @apiSuccess {String} name Created order's name.
 * @apiSuccess {Number} price Created order's price.
 */
router.post('/',async (req,res) => {
    Product.findById(req.body.productId)
    .then(product => {
        const order = new Order({
            _id : mongoose.Types.ObjectId(),
            quantity : req.body.quantity,
            product : req.body.productId
        });
        return order.save()
    }).then(
        result => {
            res.status(200).json(result);
        }
    ).catch(
        err => {
            res.status(500).json({
                error: err
            })
        }
    );
});

/**
 * @api {get} /orders/:id Get Order
 * @apiName GetOrder
 * @apiGroup Order
 * @apiVersion 1.0.0
 *
 * @apiParam {String} id Order's id.
 *
 * @apiSuccess {String} order Created order's ID.
 * @apiSuccess {String} name Created order's name.
 * @apiSuccess {Number} price Created order's price.
 */
router.get('/:id',async (req,res) => {
    res.status(200).json({
        message: 'Get order details',
        orderId : req.params.orderId
    });
});

/**
 * @api {patch} /orders/:id Patch Order
 * @apiName PatchOrder
 * @apiGroup Order
 * @apiVersion 1.0.0
 *
 * @apiParam {String} id Order's id.
 *
 * @apiSuccess {String} message Success message.
 */
router.patch('/:id',async (req,res) => {
    let _id = req.params.id;
    Order.update({_id}, req.body).exec().then(doc => {
        res.status(200).json(doc);
    }).catch(err => {
        res.status(500).json({
            error: err
        });
    })
});

/**
 * @api {delete} /orders/:id Delete Order
 * @apiName DeleteOrder
 * @apiGroup Order
 * @apiVersion 1.0.0
 *
 * @apiParam {String} id Order's id.
 *
 * @apiSuccess {String} message Success message.
 */
router.delete('/:id',async (req,res) => {
    res.status(200).json({
        message: 'Deleting order'
    });
});

module.exports = router;
