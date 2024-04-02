const mongoose = require("mongoose");   
const Schema = mongoose.Schema; 
const ModelSchema = new Schema({
  task: {
    type: String,
    required: true,
  },
  done:{
    type: Boolean, 
    default: false,
  }
}); 

const Model = mongoose.model("todos", ModelSchema);
module.exports = Model;