import Comment from "./commentModel.js";

export default class commentRespository{

async getById(commentId){
    const comm= await Comment.findById(commentId).populate('user');
        return comm;

}

async getByPostId(postId){
   const comm = await Comment.find({post:postId}).populate('user');
   return comm;
}

async createC(text,userId,postId){
  const comm=  new Comment({
     text,
     user:userId,
     post:postId
});
  return await comm.save();
}

async updateC(commentId,text){
    const comm= await Comment.findByIdAndUpdate(commentId,{text:text},{new:true});
       return await comm.save();

}

async deleteC(commentId){
    const comm= await Comment.findByIdAndDelete(commentId);
    return comm;
    

}

}