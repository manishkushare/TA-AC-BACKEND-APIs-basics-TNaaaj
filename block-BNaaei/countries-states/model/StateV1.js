const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const stateSchema = new Schema({
    name : {
        type : String
    },
    country : {
        type  : Schema.Types.ObjectId,
        ref : "CountryV1"
    },
    population : {
        type : Number
    },
    area : {
        type : Number
    },
    neighbouring_states : [
        {
        type : Schema.Types.ObjectId,
        ref : "StateV1"
        }
    ]
})

module.exports = mongoose.model('StateV1', stateSchema);