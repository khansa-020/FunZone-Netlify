import React, { useState, useEffect } from "react";
import "./projInfo.css";
const ProjInfo = () => {
  return (
    <div class="right">
      <div class="instructions">
        <div class="heading">
          <h4>Instructions</h4>
          <h5>Valid Formats</h5>
          <ul>
            <li className="li">
              <strong>Image:</strong> png, jpg, jpeg
            </li>
            <li className="li">
              <strong>File:</strong> apk, pdf, docx
            </li>
            <li className="li">
              <strong>Video:</strong> mp4
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ProjInfo;
