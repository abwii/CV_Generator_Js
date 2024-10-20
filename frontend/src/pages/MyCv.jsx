import React, { useContext,  } from "react";
import { UserContext } from '../context/UserContext.jsx';

function Mycv() {
  return (
    <div className="bg-gray-100 min-h-screen p-6 flex items-center justify-center ">
      <div className="flex flex-col lg:flex-row items-center justify-center mt-5 w-full max-w-5xl">
        {/* Left Side (Contact, Education, Skills) */}
        <div className="bg-[#364435] w-full lg:w-1/4 p-10 h-auto lg:h-[600px] my-5">
          {/* Profile Image */}
          <div className="flex items-center justify-center mb-10">
            <img
              src="https://i.pinimg.com/236x/83/df/6f/83df6f01919603fdd86b5980d61e7a14.jpg"
              alt="Profile"
              className="rounded-full w-32 border-2 border-gray-300"
            />
          </div>

          {/* Contact Section */}
          <h1 className="text-white uppercase tracking-widest text-lg font-bold">Contact</h1>
          <hr className="my-5" />
          <h1 className=" text-white">loremipsum@gmail.com</h1>
          <h1 className="text-white text-sm">07 68 41 65 85</h1>
          <h1 className="text-white text-sm">Paris 4e</h1>

          {/* Skills Section */}
          <h1 className="text-white mt-2 uppercase tracking-widest text-lg font-bold">Skills</h1>
          <hr className="my-5" />
          <ul>
            <li className="text-white text-sm list-disc ml-4">HTML5</li>
            <li className="text-white text-sm list-disc ml-4">JavaScript</li>
            <li className="text-white text-sm list-disc ml-4">Java</li>
            <li className="text-white text-sm list-disc ml-4">GoLang</li>
          </ul>
        </div>

        {/* Right Side (Summary, Experience) */}
        <div className="bg-white w-full lg:w-3/4 p-10 h-[auto]">
          <h1 className="text-5xl mb-3">{getUserInfos().firstname}{" "}{getUserInfos().lastname}</h1>

          {/* Summary Section */}
          <h1 className="text-gray-600">
            Développeuse Fullstack
            Miro Future étudiante en Mastère Dev Manager Full Stack à l'Efrei, je suis à la recherche d'une alternance
            de 24 mois à partir de Septembre pour enrichir mes compétences et débuter ma carrière professionnelle avec
            passion et détermination. 1 semaine de cours / 2 semaines en entreprise
          </h1>

          {/* Experience Section */}
          <h1 className="uppercase tracking-wider my-2 text-gray">Experience</h1>
          <ul className="list-disc ml-5 text-white">
            <li className="text-gray-600 font-semibold">
              Sept - Déc 2023 | Stage - bynativ
              <p>
                Développement d'une application mobile en utilisant Vue.js et Docker. Configuration et orchestration des
                ressources AWS avec Terraform et Terragrunt.
              </p>
            </li>
          </ul>
          <ul className="list-disc ml-5 text-white">
            <li className="text-gray-600 font-semibold">
              Sept - Déc 2023 | Stage - bynativ
              <p>
                Développement d'une application mobile en utilisant Vue.js et Docker. Configuration et orchestration des
                ressources AWS avec Terraform et Terragrunt.
              </p>
            </li>
          </ul>
          <ul className="list-disc ml-5 text-white">
            <li className="text-gray-600 font-semibold">
              Sept - Déc 2023 | Stage - bynativ
              <p>
                Développement d'une application mobile en utilisant Vue.js et Docker. Configuration et orchestration des
                ressources AWS avec Terraform et Terragrunt.
              </p>
            </li>
          </ul>

          {/* Education Section */}
          <h1 className="uppercase tracking-wider my-2 text-gray">Education</h1>
          <ul className="list-disc ml-5 text-white">
            <li className="text-gray-600 font-semibold">
              2024 - 2026 | Mastère Dev Manager Full Stack - EFREI
              <p>Formation en alternance à l'EFREI, spécialisation en développement full stack.</p>
            </li>
            <li className="text-gray-600 font-semibold">
              2024 - 2026 | Mastère Dev Manager Full Stack - EFREI
              <p>Formation en alternance à l'EFREI, spécialisation en développement full stack.</p>
            </li>
            <li className="text-gray-600 font-semibold">
              2024 - 2026 | Mastère Dev Manager Full Stack - EFREI
              <p>Formation en alternance à l'EFREI, spécialisation en développement full stack.</p>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default MyCv;
