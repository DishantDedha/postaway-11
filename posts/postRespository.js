import Post from "./postModel.js";
import User from "../src/Users/usermodel.js";


export default class postRepository{
     
    async createP(postData){
        const newPost= await new Post(postData);
         await newPost.save();

         await User.findByIdAndUpdate(newPost.user,{
            $push:{
                posts:newPost._id
            }
         })

         return newPost;

    }

    async findPById(postId){
         const post =  await Post.findById(postId).populate('user');
         return post;
    }

    async findByUser(userId){
      const post = await Post.find({user:userId}).populate('user');
      return post;
    }

    async getAll(){
        const posts=Post.find().populate('user');
        return posts;

    }

    async updateP(postId,postData){
        const post= Post.findByIdAndUpdate(postId,postData,{new:true}).populate('user');
        return post;

    }

    async deleteP(postId){
      const post=Post.findByIdAndDelete(postId);
      return post;
    }
};