import User from "../src/Users/usermodel.js";



export default class freindRespository{
   

    async getfriendsU(userId){
        const user= await User.findById(userId).populate('friends','id name email');
        return user.friends;
    }

    async getPendingRequests(userId){
        const user = await User.findById(userId).populate('friendRequests.requester','id name email');
        return user.friendRequests.filter(request=>request.state==='PENDING');
    }


    async toggleFriendship(userId,friendId){
        const user= await User.findById(userId);
        const friend= await User.findById(friendId);

        if(user.friends.includes(friendId)){
            user.friends.pull(friendId);
            friend.friends.pull(userId);
        }

            else{
                user.friends.push(friendId);
                friend.friends.push(userId);
            }

            await user.save();
            await friend.save();

            return {user,friend};
        
    }

    async responseToRequest(userId,friendId,state){
        const user= await User.findById(userId);
        
        
        console.log(friendId);
    
        const requestIndex= await user.friendRequests.findIndex(request=>request.requestor.toString()===friendId.toString());
        console.log(user.friendRequests[0].requestor.toString());
        console.log(friendId.toString());
        console.log(requestIndex);

        if(requestIndex===-1){
            throw new Error('request donot exist');
        }
            
        user.friendRequests[requestIndex].state=state;
        

        if(state==='ACCEPTED'){
            user.friends.push(friendId);
            const friend= await User.findById(friendId);
            friend.friends.push(userId);
            await friend.save();
            user.friendRequests.splice(requestIndex,1);
        }
            await user.save();

            return user.friendRequests[requestIndex];


    }

    async sendReq(userId,friendId){
        const friend = await User.findById(friendId);
        console.log(friend);

        const existingreq= await friend.friendRequests.find(req=>req.requestor.toString()===userId.toString());
        if(existingreq){
            throw new Error('request already exist');
        }

        friend.friendRequests.push({requestor:userId, state:'PENDING'})
       
        await friend.save();

        return friend;

    }
}