import axios from 'axios';

export const userChats=(id)=>axios.get(`http://localhost:5000/chat/${id}`);