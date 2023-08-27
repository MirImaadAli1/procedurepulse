import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Startpage from "./pages/Startpage";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Forgotpass from "./components/Forgotpass";
import Makenewsur from "./pages/Makenewsur";
import Fillmethod from "./pages/Fillmethod";
import SurveyDetailsPage from "./pages/Surveydetails";
import Mademethods from "./pages/Mademethods";
import Filledmethods from "./pages/filledmethods";
import Viewquestion from "./pages/Viewquestions";
import Viewresponses from "./pages/Viewresponses";
import Viewanswers from "./pages/Viewanswers";
import ViewYourAnswer from "./pages/ViewYourAnswer";



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
        <Route path="/mademethod" element={<Mademethods/>} /> 
        <Route path="/filledmethods" element={<Filledmethods/>} /> 
        <Route path="/viewquestions" element={<Viewquestion/>} /> 
        <Route path="/viewresponses" element={<Viewresponses/>} />
        <Route path="/viewanswers" element={<Viewanswers/>} />
        <Route path="/viewyouranswers" element={<ViewYourAnswer/>} />
      </Routes>
    </Router>
  );
};



export default AppRoutes;
