 
 import postRepository from "./postRespository.js";
 import User from "../src/Users/usermodel.js";

 const postRepo=new postRepository();


export const getAllPosts= async (req,res)=>{

    try {
        const allPost= await postRepo.getAll();
        res.status(201).json(allPost);
    } catch (error) {
        res.status(200).json({ message: 'Internal server error' });
    }
};
export const getPostByUser= async (req,res)=>{
    try {
        const posts = await postRepo.findByUser(req.user._id);
        
        res.status(200).json(posts);
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    
}
}

export const getPostById= async(req,res)=>{
   
    const { postId}= req.params;
    console.log(postId);
    try {
        
        const post = await postRepo.findPById(postId);
        if(!post) {
            console.log(`Post with ID ${postId} not found`);
            return res.status(404).json({ message: 'Post not found' });
        }
        res.status(201).json(post);
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
}
}

export const createPost=async(req,res)=>{
    try {
        const postData = { ...req.body, user: req.user._id };
        const newPost = await postRepo.createP(postData);
       

        res.status(201).json(newPost);
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
}
}

export const updatePost=async(req,res)=>{
    try {
        const post = await postRepo.updateP(req.params.id,req.body);
        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }
        if (post.user._id.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: 'Unauthorized' });
        }
        
        res.status(201).json(post);
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });

}
}

export const deletePost=async(req,res)=>{
    try {
        const post = await postRepo.deleteP(req.params.id);
        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }
        if (post.user._id.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: 'Unauthorized' });
        }
        
        res.status(201).json(post);
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });

}
}