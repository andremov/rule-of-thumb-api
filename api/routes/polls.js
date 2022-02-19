const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Poll = require('../models/poll');

/**
 * @api {get} /polls/ Get All Polls
 * @apiName GetAllPolls
 * @apiGroup Poll
 * @apiVersion 1.0.0
 *
 * @apiSuccess {Number} count Number of existing polls.
 * @apiSuccess {Object} list List of  polls.
 */
router.get('/',async (req,res) => {
    Poll.find()
        .exec()
        .then(docs => {
            res.status(200).json({
                count : docs.length,
                products : docs
            });
        })
        .catch(err=>{
            console.log(err);
            res.status(500).json({error:err});
        })
});

/**
 * @api {post} /polls/ Create Poll
 * @apiName CreatePoll
 * @apiGroup Poll
 * @apiVersion 1.0.0
 *
 * @apiParam {String} name Poll name
 * @apiParam {String} description Poll description
 * @apiParam {String} category Poll category
 * @apiParam {String} picture Poll picture
 * @apiParam {String} lastUpdated Poll last updated date
 * @apiParam {Number} [positiveVotes=0] Poll positive votes
 * @apiParam {Number} [negativeVotes=0] Poll negative votes
 *
 * @apiSuccess {String} id Poll unique id
 */
router.post('/',async (req,res) => {
    const defaultValues = {
        description: '',
        positiveVotes: 0,
        negativeVotes: 0
    }
    const poll = new Poll({
        ...defaultValues,
        ...req.body,
        _id: new mongoose.Types.ObjectId(),
    });
    poll.save().then( doc => {
        res.status(200).json({id: doc._id});
    }).catch(err =>{
        res.status(500).json({
            error: err
        });
    })
});

/**
 * @api {get} /polls/:id Get Poll
 * @apiName GetPoll
 * @apiGroup Poll
 * @apiVersion 1.0.0
 *
 * @apiParam {String} id Poll unique id.
 *
 * @apiSuccess {String} _id Poll unique id.
 * @apiSuccess {String} name Poll name.
 * @apiSuccess {String} description Poll description.
 * @apiSuccess {String} category Poll category.
 * @apiSuccess {String} picture Poll picture.
 * @apiSuccess {String} lastUpdated Poll lastUpdated.
 * @apiSuccess {Number} positiveVotes Poll positiveVotes.
 * @apiSuccess {Number} negativeVotes Poll negativeVotes.
 */
router.get('/:id',async (req,res) => {
    Poll.findById(req.params.id).exec().then(doc => {
        if (doc) {
            res.status(200).json(doc);
        } else {
            res.status(404).json({
                message: 'Poll not found.'
            });
        }
    }).catch( err => {
        res.status(500).json({
            error: err
        });
    })
});

/**
 * @api {patch} /polls/:id Patch Poll
 * @apiName PatchPoll
 * @apiGroup Poll
 * @apiVersion 1.0.0
 *
 * @apiParam {String} id Poll unique id.
 *
 * @apiSuccess {String} message Success message.
 */
router.patch('/:id',async (req,res) => {
    Poll.update({_id: req.params.id}, req.body).exec().then(() => {
        res.status(200).json({message: 'Success.'});
    }).catch(err => {
        res.status(500).json({
            error: err
        });
    })
});

/**
 * @api {delete} /polls/:id Delete Poll
 * @apiName DeletePoll
 * @apiGroup Poll
 * @apiVersion 1.0.0
 *
 * @apiParam {String} id Poll unique id.
 *
 * @apiSuccess {String} message Success message.
 */
router.delete('/:id',async (req,res) => {
    Poll.deleteOne({_id : req.params.id}).exec().then (() => {
        res.status(200).json({message: 'Success.'});
    }).catch(err => {
        res.status(500).json({
            message: err
        });
    });
});

module.exports = router;
