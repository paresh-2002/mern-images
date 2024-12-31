import axios from "axios";
import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../context/AuthContext";

function LogOutBtn() {
  const { getLoggedIn } = useContext(AuthContext);

  const navigate = useNavigate();

  async function logOut() {
    await axios.get(`${process.env.REACT_APP_URL}/auth/logout`);
    await getLoggedIn();
    navigate("/");
  }

  return <button onClick={logOut} style={{backgroundColor:'red', color:'white', border:'none', borderRadius:'4px', padding:"0 15px"}}>Log out</button>
}

export default LogOutBtn;