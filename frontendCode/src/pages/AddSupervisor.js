import React from "react";
import LeftSide from "../components/left/LeftSide";
import RightPlace from "../components/supervisorComp/RightPlace";

const AddSupervisor = () => {
  return (
    <>
      <main>
        <div className="Container" style={{ gridTemplateColumns: "18vw auto" }}>
          <LeftSide />
          <RightPlace />
        </div>
      </main>
    </>
  );
};

export default AddSupervisor;
