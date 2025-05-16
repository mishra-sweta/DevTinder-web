import React, { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [emailId, setEmailId] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [error, setError] = useState("");
  const [isLoginForm, setIsLoginForm] = useState(true);

  axios.defaults.baseURL = BASE_URL;
  axios.defaults.withCredentials = true;

  const handleSignUp = async () => {
    try {
      const res = await axios.post("/signup", {
        emailId,
        password,
        firstName,
        lastName,
      });

      dispatch(addUser(res?.data));
      navigate("/profile");
    } catch (error) {
      setError(error.response?.data || error.message);
    }
  };

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
    <div className=" justify-items-center my-8">
      <div className="card w-96 bg-base-200 card-md shadow-sm">
        <div className="card-body">
          <h2 className="card-title justify-center">
            {isLoginForm ? "Login" : "Sign Up"}
          </h2>
          {!isLoginForm && (
            <>
              <fieldset className="fieldset">
                <legend className="fieldset-legend">First Name:</legend>
                <input
                  type="text"
                  className="input"
                  placeholder="Type here"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </fieldset>
              <fieldset className="fieldset">
                <legend className="fieldset-legend">Last Name:</legend>
                <input
                  type="text"
                  className="input"
                  placeholder="Type here"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </fieldset>
            </>
          )}
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
            <button
              className="btn btn-primary"
              onClick={isLoginForm ? handleLogin : handleSignUp}
            >
              {isLoginForm ? "Login" : "Sign Up"}
            </button>
          </div>
          <p
            className="flex justify-center my-3 text-gray-500 cursor-pointer"
            onClick={() => setIsLoginForm((value) => !value)}
          >
            {isLoginForm ? "New user? Sign up here." : "Existing user? Login"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
