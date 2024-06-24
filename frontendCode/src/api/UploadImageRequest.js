// import axios from 'axios';

// export const uploadImage=(data)=>axios.post('http://localhost:5000/upload/', data)

// export const uploadPost=(data)=>axios.post('http://localhost:5000/post', data)

import axios from "axios"
// const API= axios({baseURL:"http://localhost:5000"})
export const uploadImage=(data)=>axios.post('http://localhost:5000/upload/', data);
// export const uploadVideo=(data)=>axios.post('http://localhost:5000/vupload/', data);
export const uploadVideo=(data)=>axios.post('http://localhost:5000/vupload/', data)
export const uploadPost=(data)=>axios.post('http://localhost:5000/post/', data);