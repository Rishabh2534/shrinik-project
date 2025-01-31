import mongoose from "mongoose";
const Events=new mongoose.Schema({
    title:{
        type:String,
        required:true,
    },
    description:{
        type:String,
        required:true,
    },
    date:{
        type:Date,
        
    },
    venue:{
        type:String,
    },
    applicationLink:{
        type:String,
        required:true,
    },
    imageUrl:{
        type:String,
        required:true,
    }
});
export default Event=mongoose.model("Event",Events);