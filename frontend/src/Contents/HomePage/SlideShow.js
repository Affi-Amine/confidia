import React, { useEffect, useRef } from "react";
import { useState } from "react";
import "../../sass/Contents/HomePage/SlideShow.scss";

import { slideShowLeft, slideShowRight } from "../../Utils/AllSlide";

import workspace from "../../assets/img/Caroussel/workSpace.png";
import cloud from "../../assets/img/Caroussel/cloud.png";
import puzzle from "../../assets/img/Caroussel/puzles.png";
import forest from "../../assets/img/Caroussel/forest.png";
import road from "../../assets/img/Caroussel/road.png";
import handleCircle from "../../assets/img/Caroussel/handeCircle.png";
import sunset from "../../assets/img/Caroussel/sunset.png";

function SlideShow() {
  const [counter, setCounter] = useState(0);

  const [ArrayImg] = useState([
    workspace,
    cloud,
    puzzle,
    forest,
    road,
    handleCircle,
    sunset,
  ]);

  const intervalRef = useRef();
  useEffect(() => {
    const Timer = 5000;

    const timeoutId = setTimeout(() => {
      slideShowLeft("#SlidesShowIMG");

      intervalRef.current = setInterval(() => {
        if (counter === ArrayImg.length - 1) {
          setCounter(0);
        } else {
          setCounter(counter + 1);
        }
        slideShowRight("#SlidesShowIMG");
      }, 1000);
    }, Timer);

    return () => {
      clearTimeout(timeoutId);
      clearInterval(intervalRef.current);
    };
  }, [ArrayImg, counter]);
  return (
    <div className="SlideShow" id="SlideShow">
      {/* <button>left</button> */}
      <div id="SlidesShowIMG" className="BoxImg">
        <img
          // ref={imgRef}
          loading="lazy"
          src={ArrayImg[counter]}
          alt="SAAS"
        />
      </div>

      {/* <button>right</button> */}
    </div>
  );
}

export default SlideShow;
