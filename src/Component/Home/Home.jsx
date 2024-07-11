/* eslint-disable no-unused-vars */
import { useContext } from "react";
import RecentProduct from "../RecentProduct/RecentProduct";
import CategorySlider from "../CategorySlider/CategorySlider";
import MainSlider from "../MainSlider/MainSlider";

function Home() {
  return (
    <>
      <MainSlider></MainSlider>
      <CategorySlider></CategorySlider>
      <RecentProduct></RecentProduct>
    </>
  );
}

export default Home;
