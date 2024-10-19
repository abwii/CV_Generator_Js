import React from "react";
import { Link } from "react-router-dom";
import { UserContext } from '../context/UserContext.jsx';


function Home() {
  return (
    <div className="h-screen w-screen flex flex-wrap items-center justify-center bg-[#F0F0F0]">
      <div className="relative bg-white w-[700px] h-[600px] m-10 p-10 flex items-center justify-center">
        <span className="absolute top-10 left-10 text-6xl font-imbue "> Picture of CV ?</span>
      </div>
      <div className=" bg-[#F0F0F0] flex flex-col items-left pt-10 ">
        <h1 className="text-9xl font-bold text-green-900 font-imbue">CV</h1>
        <h2 className="text-7xl font-bold text-green-900 font-imbue">Generator</h2>
        <p className="text-5xl text-[#1E1E1E] italic font-dancing">Want to create</p>
        <p className="text-5xl text-[#1E1E1E] italic font-dancing">your own CV in minutes?</p>
        <div className="mt-4">
          <Link
            to={"/register"}
            className="bg-green-900 text-white  font-imbue py-2 px-4 rounded mr-2"
          >
            Register
          </Link>
          <Link
            to={"/login"}
            className="bg-green-900 text-white font-imbue py-2 px-4 rounded"
          >
            Connection
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Home;
