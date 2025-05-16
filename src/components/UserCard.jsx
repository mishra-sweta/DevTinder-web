import React from "react";

const UserCard = ({ user }) => {
  const { firstName, lastName, photoUrl, age, gender, about, skills } = user;

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
            <button className="btn btn-primary">Ignore</button>
            <button className="btn btn-secondary">Interested</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
