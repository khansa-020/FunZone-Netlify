import axios from "axios";

export const getMessages=(id)=>axios.get(`http://localhost:5000/message/${id}`);

export const addMessage=(data)=>axios.post('http://localhost:5000/message/', data);