import axios from "axios"
// const API= axios({baseURL:"http://localhost:5000"})
export const LogIn=(formData)=>axios.post('http://localhost:5000/auth/login', formData);
export const SignUp=(formData)=>axios.post('http://localhost:5000/auth/register', formData);