import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { BarLoader } from "react-spinners";
function Brands() {
  let [brands, setBrands] = useState([]);
  const [Isloading, setIsloading] = useState(false);
  async function getdata() {
    setIsloading(true);
    const brand = await axios.get(
      `https://ecommerce.routemisr.com/api/v1/brands`
    );
    setBrands(brand.data.data);
    setIsloading(false);
  }
  useEffect(() => {
    getdata();
  }, []);
  if (Isloading == true) {
    return (
      <>
        <div className="w-[70%] mx-auto flex justify-center items-center">
          <BarLoader color="#36d7b7" />
        </div>
      </>
    );
  }
  return (
    <>
      <div className="flex md:flex-row flex-col flex-wrap">
        {brands.map((brand) => (
          <Link
            key={uuidv4}
            className="block md:w-1/5 w-full"
            to={`/spbrand/${brand._id}`}
          >
            <div
              onClick={() => {
                localStorage.setItem("categoryImage", brand.image);
                localStorage.setItem("categoryName", brand.name);
              }}
              className="w-full  p-5 cursor-pointer"
            >
              <img
                src={brand.image}
                alt=""
                className="w-full md:h-[200px] h-full"
              />
              <h3 className="text-center text-amber-500 font-semibold mt-3 text-2xl">
                {brand.name}
              </h3>
            </div>
          </Link>
        ))}
      </div>
    </>
  );
}

export default Brands;
