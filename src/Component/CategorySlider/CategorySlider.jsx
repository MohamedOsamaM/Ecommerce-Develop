/* eslint-disable react/jsx-key */
/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import axios from "axios";
import { useEffect, useState } from "react";
import Slider from "react-slick";
export default function CategorySlider() {
  const [categories, setCategories] = useState([]);
  function getcategories() {
    axios
      .get(`https://ecommerce.routemisr.com/api/v1/categories`)
      .then(({ data }) => {
        setCategories(data.data);
      });
  }
  useEffect(() => {
    getcategories();
  }, []);
  var settings = {
    dots: false,
    infinite: true,
    speed: 1500,
    slidesToShow: 8,
    slidesToScroll: 3,
    autoplay: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 6,
          slidesToScroll: 2,
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 2,
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        }
      }
    ]
  };
  return (
    <>
      <div className="py-5">
        <h2 className="py-4 text-gray-800 font-medium text-xl">Shop Popular Categories</h2>
        <Slider {...settings}>
          {categories.map((category) => (
            <div className="" key={category._id}>
              <img
                className="h-[200px] w-full"
                src={category.image}
                alt={category.name}
              />
              <h3 className="font-light mt-2">{category.name}</h3>
            </div>
          ))}
        </Slider>
      </div>
    </>
  );
}
