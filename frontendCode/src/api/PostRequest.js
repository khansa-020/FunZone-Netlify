import axios from "axios"

export const getTimeLinePosts=(id)=>axios.get(`http://localhost:5000/post/${id}/timeLine`);

export const likePost=(id, userId)=>axios.put(`http://localhost:5000/post/${id}/like`, {userId:userId});
