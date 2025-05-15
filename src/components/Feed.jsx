import React, { useEffect } from "react";
import UserCard from "./UserCard";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { addFeed } from "../utils/feedSlice";
import { BASE_URL } from "../utils/constants";

axios.defaults.baseURL = BASE_URL;
axios.defaults.withCredentials = true;

const Feed = () => {
  const dispatch = useDispatch();
  const feed = useSelector((store) => store.feed);

  const fetchFeed = async () => {
    try {
      if (feed.length !== 0) return;
      const res = await axios.get("/feed");
      dispatch(addFeed(res?.data?.data));
    } catch (error) {
      if (error.response && error.response.status === 401) {
        navigate("/login");
      } else {
        console.error(error.message);
      }
    }
  };

  useEffect(() => {
    fetchFeed();
  }, []);

  return (
    <div className="grid justify-items-center mt-10 gap-4">
      {feed.length == 0 ? (
        <p>No profiles found.</p>
      ) : (
        feed.map((user) => <UserCard key={user._id} user={user} />)
      )}
    </div>
  );
};

export default Feed;
