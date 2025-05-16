import { useDispatch } from "react-redux";
import axios from "../utils/axiosConfig";
import React from "react";
import { removeUserFromFeed } from "../utils/feedSlice";

const UserCard = ({ user }) => {
  const { _id, firstName, lastName, photoUrl, age, gender, about, skills } =
    user;
  const dispatch = useDispatch();

  const sendConnectionRequest = async (status, id) => {
    try {
      const res = await axios.post(`/request/send/${status}/${id}`, {});
      dispatch(removeUserFromFeed(id));
    } catch (error) {
      if (error.response && error.response.status === 401) {
        navigate("/login");
      } else {
        console.error(error.message);
      }
    }
  };

  return (
    <div className="card bg-base-300 w-96 shadow-sm ">
      <figure className="">
        <img src={photoUrl} alt="user photo" />
      </figure>
      <div className="card-body">
        <h2 className="card-title text-xl">{firstName + " " + lastName}</h2>
        {age && gender && <p>{age + ", " + gender}</p>}
        <p>{about}</p>
        {skills?.length !== 0 && <p>{skills?.map((s) => s + ", ")}</p>}
        <div className="card-actions justify-center">
          <div className="space-x-2">
            {" "}
            <button
              className="btn btn-primary"
              onClick={() => sendConnectionRequest("ignored", _id)}
            >
              Ignore
            </button>
            <button
              className="btn btn-secondary"
              onClick={() => sendConnectionRequest("interested", _id)}
            >
              Interested
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
