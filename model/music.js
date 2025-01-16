const mongoose = require('mongoose')

const music_schema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    path: {
        type: String,
        unique: true,
        required: true
    },
    image: {
        type: String,        
    }
});

const Music = mongoose.model('music', music_schema);
module.exports=Music