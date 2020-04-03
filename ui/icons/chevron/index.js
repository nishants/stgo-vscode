import React from "react";
import ChevronSvg from "./chevron.svg";

export default ({className}) => (
  <div className={`icon-chevron ${className}`}>
    <img src={ChevronSvg} alt="" />
  </div>
);
