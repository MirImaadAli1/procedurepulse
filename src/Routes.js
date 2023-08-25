import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Startpage from "./pages/Startpage";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Navbar from "./pages/Navbar";
import Forgotpass from "./components/Forgotpass";
import Makenewsur from "./pages/Makenewsur";
import Fillmethod from "./pages/Fillmethod";
import SurveyDetailsPage from "./pages/Surveydetails";



export const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Startpage />} />
        <Route path="/login" element={<Login/>} />
        <Route path="/signup" element={<Signup/>} /> 
        <Route path="/forgot" element={<Forgotpass/>} /> 
        <Route path="/makemethod" element={<Makenewsur/>} /> 
        <Route path="/fillmethod" element={<Fillmethod/>} /> 
        <Route path="/method" element={<SurveyDetailsPage/>} /> 
        

      </Routes>
    </Router>
  );
};



export default AppRoutes;
