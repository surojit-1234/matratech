import React from "react";
import "./sass/Style.css";

const BannerSection = ({ title }) => {
  return (
    <section className="banner-wrap">
      <h1>{title}</h1>
    </section>
  )
}

export default BannerSection;
