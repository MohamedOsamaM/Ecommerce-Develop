/* eslint-disable no-unused-vars */
import mainslide from "../../assets/banner-4.jpeg";
import slide1 from "../../assets/blog-img-1.jpeg";
import slide2 from "../../assets/blog-img-2.jpeg";
import slide3 from "../../assets/grocery-banner-2.jpeg";
import Slider from "react-slick";
export default function MainSlider() {
  var settings = {
    dots: false,
    infinite: true,
    speed: 1500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
  };
  return (
    <>
      <div className="flex flex-row ">
        <div className="md:w-10/12 w-8/12">
          <Slider {...settings}>
            <img src={mainslide} className="w-full md:h-[500px] h-[300px] object-fill" />
            <img src={slide1} className="w-full md:h-[500px] h-[300px] object-fill" />
            <img src={slide2} className="w-full md:h-[500px] h-[300px] object-fill" />
            <img src={slide3} className="w-full md:h-[500px] h-[300px] object-fill" />
          </Slider>
        </div>
        <div className="md:w-2/12 w-4/12">
          <img src={slide1} className="w-full md:h-[166.6666666666667px] h-[100px] object-fill" />
          <img src={slide2} className="w-full md:h-[166.6666666666667px] h-[100px] object-fill" />
          <img src={slide3} className="w-full md:h-[166.6666666666667px] h-[100px] object-fill" />
        </div>
      </div>
    </>
  );
}