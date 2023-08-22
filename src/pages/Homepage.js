import React, { useState } from "react";
import Navbar from "./Navbar";
import Existingsur from "./Existingsur";
import Makenewsur from "./Makenewsur";
import Finishedsur from "./Finishedsur";

function Homepage() {
const [currentPage, setCurrentPage] = useState("");

const renderContent = () => {
  switch (currentPage) {
    case "/existsurvey":
      return <Existingsur />;
    case "/finishedsurvey":
      return <Finishedsur />;
    case "/makesurvey":
      return <Makenewsur />;
    default:
      return null;
  }
};

return (
  <>
    <Navbar onNavigate={setCurrentPage} />
    {renderContent()}
  </>
);
}

export default Homepage;
