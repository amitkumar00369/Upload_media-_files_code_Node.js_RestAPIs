const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
  media: [
    {
      type: {
        type: String,
        required: true,
      },
      url: {
        type: String,
        required: true,
      },
    },
  ],
  // Add other fields as needed
});



module.exports =mongoose.model('Post', PostSchema);
