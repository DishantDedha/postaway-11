import likesRepository from "./likeRepository.js";

const likeRepo=new likesRepository();


export const getLikesOnPost= async(req,res)=>{
    const {id:targetId}=req.params

    try{
          const likes= await likeRepo.getLikes(targetId);
          res.status(200).json(likes);

    }catch(error){
       console.eroor(error);
        res.status(500).jsom({message:"Server Error"});
    }
}
export const toggleLikesOnPost= async(req,res)=>{
    const userId= req.user._id;
    const{id:targetId}=req.params;
    try{
        const target= await likeRepo.toggleLikes(userId,targetId);
        res.status(200).json(target);
         
    }catch(error){
       console.eroor(error);
        res.status(500).jsom({message:"Server Error"});
    }
}