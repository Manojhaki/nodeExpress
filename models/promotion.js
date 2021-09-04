const mongoose = require('mongoose');// Importing middleware
require('mongoose-currency').loadType(mongoose);// define a schema type for middleware "currency"
const Currency = mongoose.Types.Currency;// using the currency type for a specified key:value pair


const Schema = mongoose.Schema;// defining schema to use schema object


// Main document

const promotionSchema = new Schema({
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
    cost: {
        type: Currency,
        required: true,
    },
    description: {
        type: String,
        required: true
    }
}, {
    timestamps: true  // everytime we update or create a "Documant", we update its time and date
});

const Promotion = mongoose.model('Promotion', promotionSchema);

module.exports = Promotion;// we export it so we can use it in our express application