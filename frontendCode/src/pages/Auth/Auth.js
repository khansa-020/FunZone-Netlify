import React, { useState } from "react";
import "./auth.css";
import { BsFillEyeFill, BsFillEyeSlashFill } from "react-icons/bs";
import bgVideo from "../../images/loginbgvideo.mp4";
// import bgVideo from "../../images/FUNZONEvideo.mp4";
// import axios from "axios";
import poster from "../../images/game development.jpg";
import botImg from "../../images/user.png";
import { useDispatch, useSelector } from "react-redux";
import { LogIn, SignUp } from "../../actions/AuthAction";
import { Link, useNavigate } from "react-router-dom";
// import { Link } from "react-router-dom";
const Auth = (props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.authReducer.loading);
  const signupSuccess = useSelector((state) => state.authReducer.success);
  const error = useSelector((state) => state.authReducer.error);
  const [newUser, setNewUser] = useState({
    username: "",
    email: "",
    password: "",
    // photo: "",
  });
  const resetForm = () => {
    setNewUser({
      username: "",
      email: "",
      password: "",
      // photo: "",
    });
  };
  const handleChange = (e) => {
    setNewUser({ ...newUser, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    //  if(error){
    //     window.alert("Invalid Credentials!");
    //    }
    e.preventDefault();
    if (isSignup) {
      dispatch(SignUp(newUser));
      // props.showAlert("Registered!", "success");
      if (signupSuccess) {
        console.log(signupSuccess);
        console.log("inside signupSuccess");
        setIsSignup((prev) => !prev);
        resetForm();
        // navigate("/home");
      }
    } else {
      dispatch(LogIn(newUser));
      // props.showAlert("Logged In!", "success");
    }
    // const formData = new FormData();
    // formData.append("photo", newUser.photo);
    // formData.append("email", newUser.email);
    // formData.append("name", newUser.name);
    // formData.append("password", newUser.password);
    // console.log(newUser.photo);

    // axios
    //   .post("http://localhost:5000/users/add/", formData)
    //   .then((res) => {
    //     console.log(res);
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
  };
  const [isSignup, setIsSignup] = useState(true);
  const [imagePreview, setImagePreview] = useState(null);

  const [show, setShow] = useState(false);
  const handleClick = (e) => {
    e.preventDefault();
    setShow(!show);
  };
  return (
    <>
      <video poster={poster} autoPlay playsInline muted loop>
        <source src={bgVideo} type="video/mp4" />
      </video>
      <div className="main_div">
        <div className="box">
          <h1 className="authHeadfing">{isSignup ? "SignUp" : "Login"}</h1>
          <form onSubmit={handleSubmit}>
            {isSignup && (
              <div className="inputBox">
                <input
                  type="text"
                  required
                  name="username"
                  autoComplete="off"
                  onChange={handleChange}
                  value={newUser.name}
                  placeholder="Username"
                />
                {/* <label>Username</label> */}
              </div>
            )}
            <div className="inputBox">
              <input
                type="text"
                required
                id="email"
                name="email"
                autoComplete="off"
                onChange={handleChange}
                value={newUser.email}
                placeholder="Email"
              />
              {/* <label>Email</label> */}
            </div>
            <div className="inputBox">
              <input
                type={show ? "text" : "password"}
                required
                name="password"
                autoComplete="off"
                onChange={handleChange}
                value={newUser.password}
                placeholder="Password"
                // minLength={5}
              />
              {/* <label>Password</label> */}
              <button className="eyeBtn" onClick={handleClick}>
                {show ? (
                  <BsFillEyeSlashFill style={{ color: "#F15946" }} />
                ) : (
                  <BsFillEyeFill style={{ color: "#F15946" }} />
                )}
              </button>
            </div>
            <input
              type="submit"
              // value={isSignup ? "Signup" : "Login"}
              value={loading ? "loading..." : isSignup ? "Signup" : "Login"}
              disabled={loading}
            />
            {/* <input type="submit" value={error?"err...":isSignup?"Signup":"Login"} disabled={loading}/> */}
            {/* <a href="/resetPassword">Forget Password</a> */}
            <br />
            <p>
              {isSignup ? "Already have an account?" : "Don't have an account?"}{" "}
              <Link
                style={{
                  cursor: "pointer",
                  color: "blue",
                  fontWeight: "600",
                }}
                onClick={() => {
                  setIsSignup((prev) => !prev);
                  resetForm();
                }}
              >
                {isSignup ? "Login" : "Signup"}
              </Link>{" "}
            </p>
          </form>
        </div>
      </div>
    </>
  );
};

export default Auth;
