import React from "react";
import "../featuredchart/featured.scss";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import CategoryChart from "../CategoryChart";
const Featured = () => {
  return (
    <div className="featured">
      {/* <div className="top"> */}
      <h1 className="title">Total Projects</h1>
      {/* <MoreVertIcon fontSize="small" />
      </div>
      <div className="bottom"> */}
      <div className="featuredChart">
        {/* <CircularProgressbar stroke="var(--color-primary)" value={70} text={"70%"} strokeWidth={5}/> */}
        <CategoryChart />
      </div>
      {/* <p className="title">Enroll in 2022</p>
        <p className="strength">4k</p>
        <p className="desc">CUI | WAH</p>
        <div className="summary">
          <div className="category">
            <div className="categoryTitle">Digital Arts </div>
            <div className="categoryCount">1K520</div>
          </div>
          <div className="category">
            <div className="categoryTitle">Game Development</div>
            <div className="categoryCount">2K860</div>
          </div>
        </div>
      </div> */}
    </div>
  );
};

export default Featured;
