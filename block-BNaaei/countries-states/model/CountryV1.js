const mongoose = require('mongoose');
const Schema = mongoose.Schema;
var countrySchema = new Schema({
    name : {
        type : String
    },
    states : [
        {
            type : Schema.Types.ObjectId,
            ref : "StateV1"
        }
    ],
    continent : {
        type : String
    },
    population : {
        type : Number
    },
    ethinicity : [
        {
        type : String
        },
    ],
    neighbouring_countires : [
        {
            type : Schema.Types.ObjectId,
            ref : "CountryV1"
        }
    ],
    area :{
        type : Number
    }

})
module.exports = mongoose.model('CountryV1', countrySchema)