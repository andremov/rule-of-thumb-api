const mongoose = require('mongoose');

const pollSchema = mongoose.Schema({
    _id : mongoose.Schema.Types.ObjectId,
    name : {type: String, required: true},
    description : {type: String, required: true},
    category : {type: String, required: true},
    picture : {type: String, required: true},
    lastUpdated : {type: Date},
    positiveVotes : {type: Number, required: true},
    negativeVotes : {type: Number, required: true},
});

module.exports = mongoose.model('poll', pollSchema);
