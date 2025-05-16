import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../utils/userSlice";
import { BASE_URL } from "../utils/constants";
import UserCard from "./UserCard";

const EditProfile = () => {
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [age, setAge] = useState("");
  const [about, setAbout] = useState("");
  const [gender, setGender] = useState("");
  const [photoUrl, setPhotoUrl] = useState("");
  const [error, setError] = useState("");
  const [showToast, setShowToast] = useState(false);

  axios.defaults.baseURL = BASE_URL;
  axios.defaults.withCredentials = true;

  useEffect(() => {
    if (user) {
      setFirstName(user.firstName || "");
      setLastName(user.lastName || "");
      setAge(user.age || "");
      setAbout(user.about || "");
      setGender(user.gender || "");
      setPhotoUrl(user.photoUrl || "");
    }
  }, [user]);

  const handleEdit = async () => {
    setError("");
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
      dispatch(addUser(res?.data?.data));
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
    } catch (error) {
      setError(error.response?.data || error.message);
    }
  };

  return (
    <div className="flex justify-center my-8 space-x-10">
      <div className="card w-96 bg-base-300 card-md shadow-sm">
        <div className="card-body">
          <h2 className="card-title justify-center">Edit Profile</h2>
          <fieldset className="fieldset">
            <legend className="fieldset-legend">First Name:</legend>
            <input
              type="text"
              className="input"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </fieldset>
          <fieldset className="fieldset">
            <legend className="fieldset-legend">Last Name:</legend>
            <input
              type="text"
              className="input"
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
              className="input"
              value={about}
              onChange={(e) => setAbout(e.target.value)}
            />
          </fieldset>
          <fieldset className="fieldset">
            <legend className="fieldset-legend">Photo Url:</legend>
            <input
              type="text"
              className="input"
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

      {/* Preview Updated Info */}
      <UserCard user={{ firstName, lastName, photoUrl, age, gender, about }} />

      {/* Success Toast */}
      {showToast && (
        <div className="toast toast-top toast-center">
          <div className="alert alert-success">
            <span>Profile updated successfully.</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default EditProfile;
