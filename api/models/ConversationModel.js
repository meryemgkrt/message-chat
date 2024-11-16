const mongoose = require("mongoose");
const MessageSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true,
  },
  imageUrl:{
    type:String,
    default:""
  },
  videoUrl:{
    type:String,
    default:""
  },
  see:{
    type:Boolean,
    default:false
  }
}, {timestamps:true});

const ConversationSchema = new mongoose.Schema({
  sender: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true,
  },
  receiver:{
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true,
  },
  message:[
    {
        type: mongoose.Schema.ObjectId,
        ref: "Message",
    }
  ]
}, {timestamps:true});
const MessageModel = mongoose.model("Message", MessageSchema);
const ConversationModel = mongoose.model("Conversation", ConversationSchema);

module.exports = {ConversationModel, MessageModel};
