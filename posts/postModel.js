import { MongoChangeStreamError } from "mongodb";
import mongoose from "mongoose";


const postSchema= new mongoose.Schema({
    caption:{
        type:String,
        required:true
    },
    image_URL:{
        type:String

    },
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    comments:[{
          comment:{
        
        type: mongoose.Schema.Types.ObjectId,
        ref:"Comment"
          }

    }],
    createdAt:{
        type:Date,
        default: Date.now
    },
    updatedAt:{
        type:Date,
        default:Date.now
    },
    likes:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    }
        
    ],
    likeCount:{
        type:Number,
        default:0
    }
        
    
})

postSchema.pre('save', async function(next){
    this.updatedAt= Date.now();
    next();
    
})

 const Post= new mongoose.model('Post',postSchema);
 export default Post;