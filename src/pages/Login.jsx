import React, { useContext, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import UserContext from "../context/UserContext";

const Login = () => {
  let emailRef = useRef();
  let passwordRef = useRef();
  let navigate = useNavigate();

  let userCtx = useContext(UserContext)

  const handleSubmit = (e) => {
    let arr = JSON.parse(localStorage.getItem("signup")) || [];
    e.preventDefault();
    let obj = {
      email: emailRef.current.value,
      password: passwordRef.current.value,
    };
    if (!emailRef.current.value || !passwordRef.current.value) {
      return toast.warn("Enter All Fields!", {
        theme: "dark",
        position: "top-center",
      });
    }
    let user = arr.find((ele) => ele.email === obj.email);

    if (user) {
      if (user.password === obj.password) {
        toast.success("User Logged In!", {
          theme: "dark",
          position: "top-center",
        }); 
        userCtx.setUser({login:true,email:obj.email})
        localStorage.setItem('userData',JSON.stringify({login:true, email:obj.email}))
        navigate("/");
      } else {
        toast.error("Wrong Password!", {
          theme: "dark",
          position: "top-center",
        });
      }
    } else {
      toast.error("User Not Found!", {
        theme: "dark",
        position: "top-center",
      });
    }
  };
  return (
    <div className="signup">
      <form className="col-4 m-auto" onSubmit={handleSubmit}>
        <h2 className="m-auto mb-4">Login</h2>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            ref={emailRef}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="exampleInputPassword1"
            ref={passwordRef}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
        <p className="mt-2">New user? <Link to='/signup'>Register</Link></p>
      </form>
    </div>
  );
};

export default Login;
