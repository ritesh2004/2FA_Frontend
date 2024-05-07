import React, { useContext } from "react";
import Authcontext from "../context/Authcontext";

export const Home = ({username}) => {
  const  {user} = useContext(Authcontext);
  return (
    <div className="w-full h-screen flex flex-col justify-center items-center">
        <h1 className="text-5xl font-extrabold uppercase text-white">Homepage</h1>
        <h2 className="text-3xl font-light text-white my-5">Welcome {user.username}</h2>
    </div>
  );
};
