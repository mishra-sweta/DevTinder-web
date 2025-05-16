import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";
import { addConnections } from "../utils/connectionsSlice";

axios.defaults.baseURL = BASE_URL;
axios.defaults.withCredentials = true;

const Connections = () => {
  const dispatch = useDispatch();
  const connections = useSelector((store) => store.connections);
  const navigate = useNavigate();
  const user = useSelector((store) => store.user);

  const fetchConnections = async () => {
    try {
      if (connections.length !== 0) return;
      const res = await axios.get("/user/connections");
      console.log(res.data.data);
      dispatch(addConnections(res.data.data));
    } catch (error) {
      if (error.response && error.response.status === 401) {
        navigate("/login");
      } else {
        console.error(error.message);
      }
    }
  };

  useEffect(() => {
    if (!user) return;
    fetchConnections();
  }, []);

  return (
    <div>
      <h1 className="text-2xl m-10 flex justify-center">
        {connections.length === 0 ? "No connections" : "Connections"}
      </h1>
      <div className="w-full flex flex-col items-center space-y-4 my-8">
        {connections.map((connection) => (
          <div className="card card-side bg-base-300 shadow-sm w-1/2">
            <figure className="w-1/4">
              <img
                className="h-full max-h-44 object-cover "
                src={connection.photoUrl}
                alt="photo"
              />
            </figure>
            <div className="card-body w-3/4">
              <h2 className="card-title">
                {connection.firstName + " " + connection.lastName}
              </h2>
              <p>{connection.about}</p>
              {connection.skills.length !== 0 && (
                <p>{"Skills: " + connection.skills}</p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Connections;
