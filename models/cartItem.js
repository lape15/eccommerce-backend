const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ItemSchema = new Schema({
    id:{
    type: Number
    },
    name: {
        type: String,
        required: [true, 'This field is required'],
        
      },
      imageUrl: {
        type: String,
        required: [true, "image Url is required!"],
      },
      quantity: {
        type: Number,
        required: [true, 'Quantity cannot be empty!'],
        unique:false
      },
      price:{
        type: Number,
        required: [true, 'Price has gotta be valid!'],
        unique:false
      },
      owner: {type: Schema.Types.ObjectId, ref: 'User'}
      
})

const Item = mongoose.model.ItemSchema || mongoose.model('Item', ItemSchema);

module.exports = Item;