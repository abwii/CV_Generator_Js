import React from "react";
import { Link } from "react-router-dom";
function Register() {
  return (
    <div className="min-h-screen bg-[#F0F0F0] flex justify-center items-center">
      <div className="w-full max-w-md">
        {/* Bouton Retour */}
        <div className="flex justify-start mb-8">
          <Link
            to={"/home"}
            className="flex items-center text-[#394A2E] text-lg border border-[#394A2E] rounded-full px-4 py-1 hover:bg-[#394A2E] hover:text-white transition"
          >
            <span className="mr-2">←</span> home
          </Link>
        </div>

        {/* Formulaire d'enregistrement */}
        <div className="bg-white p-10 shadow-md rounded-lg">
          <h1 className="text-4xl text-center font-bold text-[#394A2E] mb-6">
            Register
          </h1>

          <form>
            {/* Champs du formulaire */}
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Surname"
                className="w-full p-3 border border-[#394A2E] rounded-md bg-gray-200"
              />
              <input
                type="text"
                placeholder="Name"
                className="w-full p-3 border border-[#394A2E] rounded-md bg-gray-200"
              />
              <input
                type="text"
                placeholder="Phone"
                className="w-full p-3 border border-[#394A2E] rounded-md bg-gray-200"
              />
              <input
                type="text"
                placeholder="City"
                className="w-full p-3 border border-[#394A2E] rounded-md bg-gray-200"
              />
              <input
                type="email"
                placeholder="Mail"
                className="w-full p-3 border border-[#394A2E] rounded-md bg-gray-200"
              />
              <input
                type="password"
                placeholder="Password"
                className="w-full p-3 border border-[#394A2E] rounded-md bg-gray-200"
              />
            </div>

            {/* Bouton d'enregistrement */}
            <div className="mt-6 text-center">
              <button className="w-full p-3 bg-[#394A2E] text-white rounded-md hover:bg-[#2e3e23] transition">
                Register
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Register;
