import React, { useState } from "react";
import UserContext from "./UserContext";

const UserContextProvider = (props) => {
  let data = JSON.parse(localStorage.getItem("userData"));
  let [search, setSearch] = useState("");
  let [user, setUser] = useState({
    login: data ? data.login : false,
    email: data ? data.email : "",
  });
  return (
    <UserContext.Provider value={{ user, setUser, search, setSearch }}>
      {props.children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;
