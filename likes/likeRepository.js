import Post from "../posts/postModel.js";
import Comment from "../comments/commentModel.js";


export default class likesRepository{
     
    async getLikes(targetId){
        let target= await Post.findById(targetId).populate('likes','id name email');
        if(!target){
            target= await Comment.findById(targetId).populate('likes','id name email');
        }
        if(!target)
        {
            throw new Error('target not found');
        }

        return target.likes;

    }

    async toggleLikes(userId,targetId){

        let target= await Post.findById(targetId);
        if(!target){
            target=await Comment.findById(targetId);
        }
        if(!target){
            throw new Error('target not found')
        }
             const likeIndex= target.likes.indexOf(userId);
             if(likeIndex== -1){
                target.likes.push(userId);
                target.likeCount+=1
             }
             else{
                target.likes.splice(likeIndex,1);
                target.likeCount-=1;
             }

             await target.save();
             return target;

    }

}

