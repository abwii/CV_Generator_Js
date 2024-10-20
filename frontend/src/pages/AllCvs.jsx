import { useState, useEffect } from 'react';

function AllCvs() {
  const [allCv, setAllCv] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('http://localhost:5001/api/cv/all');
      const data = await response.json();
      setAllCv(data); // Mets à jour l'état avec la liste des CV
    };

    fetchData();
  }, []);

  return (
    <>
      <div className="flex flex-wrap p-3 items-center justify-center h-screen bg-white">
       
          {allCv.length > 0  ? (
            allCv.map((cv,index) => (

              cv.visible == true ? (
                <div key={index} className="relative  my-6 bg-white shadow-sm border border-slate-200 rounded-lg w-96">
                  <div className="p-4">
                    <h5 className="mb-2 text-slate-800 text-xl font-semibold">
                    {cv.title}
                    </h5>
                    <p className="text-slate-600 leading-normal font-light">
                    {cv.description}
                    </p>

                    <button className="rounded-md bg-slate-800 py-2 px-4 mt-6 border border-transparent text-center text-sm text-white transition-all shadow-md hover:shadow-lg focus:bg-slate-700 focus:shadow-none active:bg-slate-700 hover:bg-slate-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none" type="button">
                      Read more
                    </button>
                  </div>
                  </div>
              ) : ""
              
                 
             
            ))
          ) : (
            <div className="px-6 py-4">
              
              <p className="text-gray-700 text-base">
             aucun
              </p>
            </div>
          )}
          <div className="px-6 pt-4 pb-2"></div>
        </div>
      
    </>
  );
}

export default AllCvs;
