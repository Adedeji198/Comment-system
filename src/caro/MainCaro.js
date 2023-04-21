import { useState } from "react";

const MainCaro = () => {
  const picArray = [
    "caro/img1.jpg",
    "caro/img2.jpg",
    "caro/img3.jpg",
    "caro/img4.jpg",
    "caro/img5.jpg",
  ];

  const [currentPic, setCurrentPic] = useState(0);

  //   setInterval(() => {
  //     setCurrentPic((curr) => curr + 1);
  //     console.log(currentPic);
  //   }, 1000);
  return (
    <div className="caro_container w-[60%] mx-auto bg-gray-500">
      <button className="previous">&larr;</button>
      <div className="carousel relative w-full">
        {picArray.map((pic, i) => (
          <img
            src={pic}
            alt=""
            key={i}
            className="absolute top-0 h-[30rem] object-cover duration-1000 w-full"
            style={{ transform: `translateX(${(i - currentPic) * 100}%)` }}
          />
        ))}
      </div>
      <button className="next">&rarr;</button>
    </div>
  );
};

export default MainCaro;
