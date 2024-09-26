import React, { useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Signup = () => {
  let nameRef = useRef()
  let emailRef = useRef()
  let passwordRef = useRef()
  let navigate = useNavigate()

  const handleSubmit = (e)=>{

    let arr = JSON.parse(localStorage.getItem('signup')) || []
    e.preventDefault()
    let obj = {
      name:nameRef.current.value,
      email:emailRef.current.value,
      password:passwordRef.current.value
    }
    if(!emailRef.current.value || !passwordRef.current.value || !nameRef.current.value){
      toast.warn('Enter All Fields!',{
        theme:'dark',
        position:'top-center'
      })
    }
    let user = arr.find((ele)=>ele.email === obj.email)
    if(user){
      toast.error('User already registered!', {
        theme:'dark',
        position:'top-center'
      })
    }
    else{
      arr.push(obj)
      localStorage.setItem('signup',JSON.stringify(arr))
      toast.success('Registered Successfully!',{
        theme:'dark',
        position:'top-center'
      })
    }
    navigate('/login')
  }
  return (
    <div className="signup">
      <form className="col-4 m-auto" onSubmit={handleSubmit}>
        <div className="mb-3">
          <h2 className="m-auto mb-4">Register</h2>
          <label htmlFor="name" className="form-label">
            Name
          </label>
          <input
            type="text"
            className="form-control"
            id="name"
            aria-describedby="emailHelp"
            ref={nameRef}
          />
        </div>
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
        <p className="mt-2">Already registered? <Link to='/login'>Login</Link></p>

      </form>
    </div>
  );
};

export default Signup;
