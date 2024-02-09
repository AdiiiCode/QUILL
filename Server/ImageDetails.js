const mongoose = require('mongoose');

const imageSchema = new mongoose.Schema(

    {
        image:String
    },
    

  // Other fields related to an image (such as author, description, etc.) can be added here
);

const Image = mongoose.model('ImageDetails', imageSchema);

module.exports = Image;
