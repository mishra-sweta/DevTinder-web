import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
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
    <div className="flex flex-col items-center">
      <h1 className="text-2xl m-10">
        {connections.length === 0 ? "No connections" : "Connections"}
      </h1>

      {connections.map((connection) => (
        <div
          key={connection._id} // Use a unique key like connection.id
          className="card card-side bg-base-300 shadow-sm w-1/2 mb-6"
        >
          <figure className="w-1/4">
            <img
              className="h-full max-h-44 object-cover w-full"
              src={connection.photoUrl}
              alt="photo"
            />
          </figure>

          <div className="card-body w-3/4 flex flex-row justify-between items-center">
            <div>
              <h2 className="card-title">
                {connection.firstName + " " + connection.lastName}
              </h2>
              <p>{connection.about}</p>
              {connection.skills.length !== 0 && (
                <p>{"Skills: " + connection.skills.join(", ")}</p>
              )}
            </div>

            <Link to={"/chat/" + connection._id}>
              <button className="btn btn-primary">Chat</button>
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Connections;
