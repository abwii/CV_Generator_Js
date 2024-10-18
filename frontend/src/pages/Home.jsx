import React from "react";
import { Link } from "react-router-dom";
function Home() {
  return (
    <div className="min-h-screen flex justify-center items-center bg-[#F0F0F0]">
      {/* Left Section: Picture of CV */}
      <div className="flex">
        {/* <div className="w-3/5 bg-white border border-gray-300 p-8">
          <p className="text-3xl font-semibold text-center">Picture of CV?</p>
        </div>
 */}
        {/* Right Section: CV Generator */}
        <div className="w-2/5 flex flex-col justify-center items-center pl-10">
          <h1 className="text-5xl font-bold text-[#394A2E] mb-4">
            CV Generator
          </h1>
          <p className="text-lg italic text-gray-700 mb-6">
            Want to create your own CV in minutes?
          </p>
          <div className="flex space-x-4">
            <Link
              to={"/register"}
              className="px-6 py-2 bg-[#394A2E] text-white rounded-full hover:bg-[#2e3e23]"
            >
              Register
            </Link>
            <Link
              to={"/login"}
              className="px-6 py-2 bg-[#394A2E] text-white rounded-full hover:bg-[#2e3e23]"
            >
              Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
