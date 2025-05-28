import React, { useState, useEffect } from "react";

const Slideshow = () => {
 const heroImage = ['./img/hero1.jpeg',
                    './img/hero2.jpeg',
                    './img/hero3.jpeg',
                    './img/hero4.jpeg',
                    './img/hero5.jpeg',
                    './img/img4.jpg'];
                
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % heroImage.length);
    }, 4000); // change every 4 seconds
    return () => clearInterval(timer);
  }, [heroImage.length]);

  return (
    <div className="relative w-full h-[90vh] overflow-hidden rounded-lg shadow-lg">
      {heroImage.map((heroImage, index) => (
        <img
          key={index}
          src={heroImage}
          alt={`slide-${index}`}
          className={`absolute w-full h-full object-cover transition-opacity duration-1000 ease-in-out ${
            index === current ? "opacity-100" : "opacity-0"
          }`}
        />
      ))}
    </div>
  );
};

export default Slideshow;
