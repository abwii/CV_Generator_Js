import  { useState, useContext,useEffect } from "react";
import { UserContext } from '../context/UserContext.jsx';
import { Link, useNavigate } from 'react-router-dom';
function Mycv() {
  const { getUserInfos } = useContext(UserContext);
  const userId = getUserInfos().id;

 const [myCv,setMyCv] = useState();
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`http://localhost:5001/api/cv/${userId}`);
      const data = await response.json();
      console.log(data)
      setMyCv(data); // Mets à jour l'état avec la liste des CV
    };

    fetchData();
  }, []);
 
  
  return (

    <>


    

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
          <h1 className=" text-white">{getUserInfos().email}</h1>
          <h1 className="text-white text-sm">{getUserInfos().phone}</h1>
          <h1 className="text-white text-sm">{getUserInfos().address}</h1>

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
          <h1 className="text-5xl mb-3">{myCv.title}</h1>

          {/* Summary Section */}
          <h1 className="text-gray-600">
         
          </h1>

          {/* Experience Section */}
          <h1 className="uppercase tracking-wider my-2 text-gray">Experience</h1>
          <ul className="list-disc ml-5 text-white">
            <li className="text-gray-600 font-semibold">
              Sept - Déc 2023 | Stage - bynativ
              <p>
                Développement d une application mobile en utilisant Vue.js et Docker. Configuration et orchestration des
                ressources AWS avec Terraform et Terragrunt.
              </p>
            </li>
          </ul>
          <ul className="list-disc ml-5 text-white">
            <li className="text-gray-600 font-semibold">
              Sept - Déc 2023 | Stage - bynativ
              <p>
                Développement d une application mobile en utilisant Vue.js et Docker. Configuration et orchestration des
                ressources AWS avec Terraform et Terragrunt.
              </p>
            </li>
          </ul>
          <ul className="list-disc ml-5 text-white">
            <li className="text-gray-600 font-semibold">
              Sept - Déc 2023 | Stage - bynativ
              <p>
                Développement d une application mobile en utilisant Vue.js et Docker. Configuration et orchestration des
                ressources AWS avec Terraform et Terragrunt.
              </p>
            </li>
          </ul>

          {/* Education Section */}
          <h1 className="uppercase tracking-wider my-2 text-gray">Education</h1>
          <ul className="list-disc ml-5 text-white">
            <li className="text-gray-600 font-semibold">
              2024 - 2026 | Mastère Dev Manager Full Stack - EFREI
              <p>Formation en alternance à  EFREI, spécialisation en développement full stack.</p>
            </li>
            <li className="text-gray-600 font-semibold">
              2024 - 2026 | Mastère Dev Manager Full Stack - EFREI
              <p>Formation en alternance à  EFREI, spécialisation en développement full stack.</p>
            </li>
            <li className="text-gray-600 font-semibold">
              2024 - 2026 | Mastère Dev Manager Full Stack - EFREI
              <p>Formation en alternance à  EFREI, spécialisation en développement full stack.</p>
            </li>
          </ul>
        </div>
      </div>
      <div className="item-ends">
        <Link  to={"/updatecv"} className="flex p-2.5 bg-yellow-500 rounded-xl hover:rounded-3xl hover:bg-yellow-600 transition-all duration-300 text-white">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
        </svg>
        </Link> 
    </div>
    </div>
    </>   

  );
}

export default Mycv;