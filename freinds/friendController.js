import freindRespository from "./friend repository.js";

const friendRepo= new freindRespository();


export const getFriends=async(req,res)=>{
       const{userId}=req.params;
    try{
         const friends= await friendRepo.getfriendsU(userId);
         res.status(200).json(friends);
    }catch(error){
        console.error(error);
        res.status(500).json({message:"Server Error"})
    }
    }



    export const getPendingFriendRequests=async(req,res)=>{
        try{

            const requests=await friendRepo.getPendingRequests(req.user._id);

            res.status(201).json(requests);
    
        }catch(error){
            console.error(error);
            res.status(500).json({message:"Server Error"})
        }
        }





        export const toggleFriends=async(req,res)=>{
            const{friendId}=req.params;
                console.log(friendId);
            try{
                     const result = await friendRepo.toggleFriendship(req.user._id,friendId);
                     res.status(200).json(result);

            }catch(error){
                console.error(error);
                res.status(500).json({message:"Server Error"})
            }
            }



            export const responseToFriendRequest=async(req,res)=>{
                   const userId=req.user._id;
                   const {friendId}=req.params;
                   const{state}= req.body;
                   console.log(state);
                try{
                        const result = await friendRepo.responseToRequest(userId,friendId,state);
                        res.status(200).json(result);

                }catch(error){
                    console.error(error);
                    res.status(500).json({message:"Server Error"})
                }
                }

                export const sendFriendRequest=async(req,res)=>{
                    const {friendId}=req.params;

                    try{
                          const request=await friendRepo.sendReq(req.user._id,friendId);
                          console.log("request sent successfully");
                          res.status(200).json(request);
                }catch(error){
                    console.error(error);
                    res.status(500).json({message:"Server Error"})
                }
                }

