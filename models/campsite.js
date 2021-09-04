const mongoose = require('mongoose');// Importing middleware
require('mongoose-currency').loadType(mongoose);// define a schema type for middleware "currency"
const Currency = mongoose.Types.Currency;// using the currency type for a specified key:value pair


const Schema = mongoose.Schema;// defining schema to use schema object
/**
  High level overvies of Mongo

Database
  |
    ---collections > holds documents
       |
         -----Documents > contains the data (eg: username & password)
           |
            ------- sub-Documents > Referencing another schema
 */

// creating a new instance of schema

const commentSchema = new Schema({

    // what is javascript object notation (JSON)?
    // it is data structure that contains the key:value pair


    // Inside a schema. we are defining it's properties
    rating: {
        type: Number,// type refers to how we will store it in out database
        min: 1,
        max: 5,
        required: true// a user cannot make a POST request without having this data
    },
    text: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});


// Main document

const campsiteSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true// there is only one of these
    },
    description: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    elevation: {
        type: Number,
        required: true
    },
    cost: {
        type: Currency,
        required: true,
        min: 0
    },
    featured: {
        type: Boolean,
        default: false
    },
    // sub-document
    // declared it to be called commentSchema
    comments: [commentSchema]
}, {
    timestamps: true  // everytime we update or create a "Documant", we update its time and date
});
// creating a variable names campsite
// the value uses a third party middle ware "mongoose" and uses a function called model()
// what is this function doing?
// The first argument is the name of the collection
// the second argument is the Schema we have built 
// we are just creating this schema called campsite inside our database
// setting up th structure of our collection named "campsite"
const Campsite = mongoose.model('Campsite', campsiteSchema);

module.exports = Campsite;// we export it so we can use it in our express application