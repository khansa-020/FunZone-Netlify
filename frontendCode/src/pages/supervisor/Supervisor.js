import React from "react";
import TopBar from "../../components/topBar/TopBar";
import LeftSideSup from "../../components/left/LeftSideSup";
// import AllSupervisors from "../../pages/supervisor/AllSupervisors";
import RightSide from "../../components/right/RightSide";
import MiddleSideSup from "../../components/supervisorComp/MiddleSideSup";
const Supervisor = () => {
  return (
    <>
      {/* <TopBar />
      <main>
        <div className="Container">
          <LeftSideSup />
          <AllSupervisors />
          <RightSide />
        </div>
      </main> */}
      <TopBar />
      <main>
        <div className="Container">
          <LeftSideSup />
          <MiddleSideSup />
          <RightSide />
        </div>
      </main>
    </>
  );
};

export default Supervisor;
