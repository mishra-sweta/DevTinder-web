import axios from "../utils/axiosConfig";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addRequests, removeRequest } from "../utils/requestsSlice";

const Requests = () => {
  const dispatch = useDispatch();
  const requests = useSelector((store) => store.requests);
  const navigate = useNavigate();
  const user = useSelector((store) => store.user);

  const reviewRequest = async (id, status) => {
    try {
      console.log(id);

      const res = await axios.post(`request/review/${status}/${id}`, {});
      dispatch(removeRequest(id));
    } catch (error) {
      if (error.response && error.response.status === 401) {
        navigate("/login");
      } else {
        console.error(error.message);
      }
    }
  };

  const fetchRequests = async () => {
    try {
      const res = await axios.get("/user/requests/received");
      dispatch(addRequests(res?.data?.data));
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
    fetchRequests();
  }, []);
  return (
    <div>
      <h1 className="text-2xl m-10 flex justify-center">
        {requests.length === 0
          ? "No connection requests"
          : "Connection Requests"}
      </h1>
      <div className="w-full flex flex-col items-center space-y-4 my-8">
        {requests.map((request) => (
          <div className="card card-side bg-base-300 shadow-sm w-1/2">
            <figure>
              <img
                className="h-full max-h-28 object-cover"
                src={request.fromUserId.photoUrl}
                alt="photo"
              />
            </figure>
            <div className="m-3 ml-8">
              <h2 className="text-base font-semibold">
                {request.fromUserId.firstName +
                  " " +
                  request.fromUserId.lastName}
              </h2>
              {request.fromUserId.age && request.fromUserId.gender && (
                <p>
                  {request.fromUserId.age + ", " + request.fromUserId.gender}
                </p>
              )}
              <div className="space-x-2 my-3">
                {" "}
                <button
                  className="btn btn-primary btn-sm"
                  onClick={() => reviewRequest(request._id, "rejected")}
                >
                  Reject
                </button>
                <button
                  className="btn btn-secondary btn-sm"
                  onClick={() => reviewRequest(request._id, "accepted")}
                >
                  Accept
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Requests;
