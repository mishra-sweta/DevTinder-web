import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { BASE_URL } from "../utils/constants";
import UserCard from "./UserCard";

const EditProfile = ({ user }) => {
  const [firstName, setFirstName] = useState(user?.firstName);
  const [lastName, setLastName] = useState(user?.lastName);
  const [age, setAge] = useState(user?.age);
  const [about, setAbout] = useState(user?.about);
  const [gender, setGender] = useState(user?.gender);
  const [photoUrl, setPhotoUrl] = useState(user?.photoUrl);
  const [error, setError] = useState("");

  const dispatch = useDispatch();

  axios.defaults.baseURL = BASE_URL;
  axios.defaults.withCredentials = true;

  const handleEdit = async () => {
    try {
      const updatedData = {
        firstName,
        lastName,
        age,
        about,
        gender,
        photoUrl,
      };

      const res = await axios.put("/profile/edit", updatedData);
      console.log(res?.data?.data);
      console.log(res);
      dispatch(addUser(res?.data?.data));
    } catch (error) {
      setError(error.response?.data || error.message);
    }
  };

  return (
    <div className="flex justify-center my-8 space-x-10">
      <div className="card w-96 bg-base-200 card-md shadow-sm ">
        <div className="card-body">
          <h2 className="card-title justify-center">Edit Profile</h2>
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
          <div className="flex space-x-3 mr-3">
            <fieldset className="fieldset w-1/2">
              <legend className="fieldset-legend">Age:</legend>
              <input
                type="text"
                className="input w-full"
                placeholder="Type here"
                value={age}
                onChange={(e) => setAge(e.target.value)}
              />
            </fieldset>
            <fieldset className="fieldset w-1/2">
              <legend className="fieldset-legend">Gender:</legend>
              <select
                className="select select-bordered w-full"
                value={gender}
                onChange={(e) => setGender(e.target.value)}
              >
                <option value="">Select gender</option>
                <option value="male">male</option>
                <option value="female">female</option>
                <option value="other">others</option>
              </select>
            </fieldset>
          </div>
          <fieldset className="fieldset">
            <legend className="fieldset-legend">About:</legend>
            <textarea
              type="text"
              className="input"
              placeholder="Type here"
              value={about}
              onChange={(e) => setAbout(e.target.value)}
            />
          </fieldset>
          <fieldset className="fieldset">
            <legend className="fieldset-legend">Photo Url:</legend>
            <input
              type="text"
              className="input"
              placeholder="Type here"
              value={photoUrl}
              onChange={(e) => setPhotoUrl(e.target.value)}
            />
          </fieldset>
          <p className="text-sm text-red-600">{error}</p>
          <div className="justify-center card-actions pt-3">
            <button className="btn btn-primary" onClick={handleEdit}>
              Edit
            </button>
          </div>
        </div>
      </div>
      <UserCard user={{ firstName, lastName, photoUrl, age, gender, about }} />
    </div>
  );
};

export default EditProfile;
