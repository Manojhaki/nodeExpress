const mongoose = require('mongoose');// Importing middleware
require('mongoose-currency').loadType(mongoose);// define a schema type for middleware "currency"

const Schema = mongoose.Schema;// defining schema to use schema object


// Main document

const partnerSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true// there is only one of these
    },
    image: {
        type: String,
        required: true
    },
    featured: {
        type: Boolean,
        default: false
    },
    description: {
        type: String,
        required: true

    }
}, {
    timestamps: true
});

const Partner = mongoose.model('Partner', partnerSchema);

module.exports = Partner;// we export it so we can use it in our express application