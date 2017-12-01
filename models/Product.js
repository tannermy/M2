var mongoose = require('mongoose');
var ProductSchema = new mongoose.Schema({
  title: String,
  buys: {type: Number, default: 0},
  price: {type: Number, default: 0},
  image: String
});

ProductSchema.methods.buy = function(cb) {
  this.buys += 1;
  this.save(cb);
};
mongoose.model('Product', ProductSchema);