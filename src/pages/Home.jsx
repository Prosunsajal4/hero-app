import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Outlet } from "react-router";
import AppLoader from "../components/AppLoader";
const Home = () => {
  return (
    <div>
      <AppLoader>
        <Header></Header>
        <Outlet></Outlet>
        <Footer></Footer>
      </AppLoader>
    </div>
  );
};

export default Home;
