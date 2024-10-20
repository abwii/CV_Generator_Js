import { useContext } from "react";
import { Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import MyAccount from "./pages/MyAccount";
import MyCv from "./pages/MyCv";
import AllCvs from "./pages/AllCvs";
import GenerateCV from "./pages/GenerateCV";
import { UserContext } from './context/UserContext';

function App() {
  const { getUserInfos } = useContext(UserContext);

  return (
    <>
      <div>
        <Header />
      </div>
      <Routes>
        {/* Si l'utilisateur est connecté, la route par défaut est "allcvs", sinon c'est "home" */}
        {getUserInfos() ? (
          <Route index path="/" element={<AllCvs />} />
        ) : (
          <Route index path="/" element={<Home />} />
        )}
        
        {/* Autres routes */}
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/myaccount" element={<MyAccount />} />
        <Route path="/mycv" element={<MyCv />} />
        <Route path="/allcvs" element={<AllCvs />} />
        <Route path="/generatemycv" element={<GenerateCV />} />
      </Routes>
    </>
  );
}

export default App;
