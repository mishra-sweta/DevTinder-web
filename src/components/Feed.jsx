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
  const user = useSelector((store) => store.user);
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
    if (!user) return;
    fetchFeed();
  }, []);

  return (
    <div className="grid justify-items-center my-5 gap-4">
      {feed.length == 0 ? (
        <p className="text-2xl">No profiles found.</p>
      ) : (
        <UserCard user={feed[0]} />
      )}
    </div>
  );
};

export default Feed;
