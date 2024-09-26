import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import ItemsContext from "../context/ItemsContex";
import UserContext from "../context/UserContext";
import { toast } from "react-toastify";

const Navbar = () => {
  let userCtx = useContext(UserContext)
  let login = userCtx.user.login
  let [searchVal, setSearchVal]= useState('')

  let handleSearch = ((e)=>{
    userCtx.setSearch(e.target.value.toLowerCase())
    setSearchVal(e.target.value)
  })
  let handleLogout = ()=>{
    localStorage.removeItem('userData')
    setSearchVal('')
    userCtx.setSearch('')
    userCtx.setUser({login:false, email:''})
    toast.success('Logged Out!',{theme:'dark',position:'top-center'})
  }
  let item = useContext(ItemsContext);
  return (
    <div>
      <nav className="navbar navbar-expand-lg bg-dark navbar fixed-top">
        <div className="container-fluid">
          <Link className="navbar-brand" to="">
            Navbar
          </Link>
          <button
            className="navbar-toggler bg-white mb-2"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <form className="d-flex ms-auto" role="search">
              <input
                className="form-control me-2"
                type="search"
                placeholder="Search"
                aria-label="Search"
                onChange={handleSearch}
                value={searchVal}
              />
            </form>

            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              {login && <Link className="navbar-brand" to="/">
                Home
              </Link>}
              {/* <button
                className="navbar-toggler"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#navbarSupportedContent"
                aria-controls="navbarSupportedContent"
                aria-expanded="false"
                aria-label="Toggle navigation"
              >
                <span className="navbar-toggler-icon" />
              </button> */}
              {login && <li className="nav-item">
                <Link
                  className="nav-link active"
                  aria-current="page"
                  to="/about"
                >
                  About
                </Link>
              </li>}
              {!login && <li className="nav-item">
                <Link className="nav-link" to="/signup">
                  Signup
                </Link>
              </li>}
              {!login && <li className="nav-item">
                <Link className="nav-link" to="/login">
                  SignIn
                </Link>
              </li>}
              {login && <li className="nav-item">
                <Link className="nav-link" to="/cart">
                  Cart{" "}
                  <sup className="text-danger bg-warning p-1 rounded">
                    {item.items.length}
                  </sup>
                </Link>
              </li>}
              {login && <li onClick={handleLogout} className="nav-item">
                <Link className="nav-link" to="#">
                  Logout
                </Link>
              </li>}
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
