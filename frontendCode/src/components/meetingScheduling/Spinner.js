import React from "react";
import { useState, CSSProperties } from "react";
import HashLoader from "react-spinners/HashLoader";

const Spinner = () => {
  let [color, setColor] = useState("#ffffff");
  return (
    <>
      <HashLoader
        // loading={loading}
        size={150}
        color="#f15946"
      />
      {/* <div className="sweet-loading"> */}
      {/* <ClipLoader
          color={"#f15946"}
          //   loading={loading}
          //   cssOverride={override}
          size={150}
          aria-label="Loading Spinner"
          data-testid="loader"
        /> */}
      {/* </div> */}
    </>
  );
};

export default Spinner;
