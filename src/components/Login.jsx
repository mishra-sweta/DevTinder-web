import React, { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [emailId, setEmailId] = useState("sweta@gmail.com");
  const [password, setPassword] = useState("Sweta@123");
  const [error, setError] = useState("");

  axios.defaults.baseURL = BASE_URL;
  axios.defaults.withCredentials = true;

  const handleLogin = async () => {
    try {
      const res = await axios.post("/login", { emailId, password });

      dispatch(addUser(res?.data));
      navigate("/");
    } catch (error) {
      setError(error.response?.data || error.message);
    }
  };

  return (
    <div className=" justify-items-center pt-15">
      <div className="card w-96 bg-base-200 card-md shadow-sm">
        <div className="card-body">
          <h2 className="card-title justify-center">Login</h2>
          <fieldset className="fieldset">
            <legend className="fieldset-legend">Email ID:</legend>
            <input
              type="text"
              className="input"
              placeholder="Type here"
              value={emailId}
              onChange={(e) => setEmailId(e.target.value)}
            />
          </fieldset>
          <fieldset className="fieldset">
            <legend className="fieldset-legend">Password:</legend>
            <input
              type="password"
              className="input"
              placeholder="Type here"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </fieldset>
          <p className="text-sm text-red-600">{error}</p>
          <div className="justify-center card-actions pt-3">
            <button className="btn btn-primary" onClick={handleLogin}>
              Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
