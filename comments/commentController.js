import commentRespository from "./commentRespository.js"
import Post from "../posts/postModel.js";

const commentRepo= new commentRespository();


//export const check= async(req,res)=>{
   // console.log("this is working");
   // res.json({message:'this is working'});}


export const getComments = async(req,res) => {
    const { postId } = req.params;
    try {
        const comments = await commentRepo.getByPostId(postId);
        res.status(200).json(comments);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const postComments = async (req,res) => {
   
   
    try {
        const { postId } = req.params;
    const{text}=req.body;
       const userId=req.user._id;
        const comments = await commentRepo.createC(text,userId,postId);
        res.status(201).json(comments);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const updateComments = async (req, res) => {
    const { commentId } = req.params;
    
    const userId=req.user._id;
    console.log(userId);
    
   
    const { text }=req.body;
   
    
    try {
        const comments = await commentRepo.getById(commentId);
       
        if (!comments) {
            return res.status(404).json({ message: 'Comment not found' });
        }
         const post= await Post.findById(comments.post);
         if (!post) {
            return res.status(404).json({ message: 'post not found' });
         }
         console.log(comments.user._id);
         console.log(post.user._id);

        if (comments.user._id.toString()!==userId.toString()  && post.user._id.toString()!==userId.toString()) {
           return res.status(404).json({ message: 'User not found' });
         }
           const updateComment= await commentRepo.updateC(commentId,text);

        res.status(200).json(updateComment);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const deleteComments = async (req, res) => {
    const { commentId } = req.params;
    const userId= req.user._id;
    try {
        const comments = await commentRepo.getById(commentId);
        if (!comments) {
            return res.status(404).json({ message: 'Comment not found' });
        }
         const post= await Post.findById(comments.post);
         if (!post) {
            return res.status(404).json({ message: 'post not found' });
         }
         if (comments.user._id.toString()!==userId.toString()  && post.user._id.toString()!==userId.toString()) {
            return res.status(404).json({ message: 'User not found' });
         }
           const deletedComment= await commentRepo.deleteC(commentId);

        res.status(200).json(deletedComment);
     
}catch (error) {
    res.status(500).json({ error: error.message });
}
}