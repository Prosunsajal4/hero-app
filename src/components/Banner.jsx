import React from "react";
import {
  FaGooglePlay,
  FaApple,
  FaClock,
  FaCheckCircle,
  FaPowerOff,
} from "react-icons/fa";
import { SiTrello } from "react-icons/si";
import { MdCancel } from "react-icons/md";
import { useLoaderData } from "react-router";
import { GoDownload } from "react-icons/go";
import { FaStar } from "react-icons/fa";

export default function Banner() {
  const data = useLoaderData();
  console.log(data);
  return (
    <section className="w-full pt-6 bg-white text-gray-800">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          We Build <span className="text-purple-600">Productive</span> Apps
        </h1>
        <p className="text-gray-500 max-w-2xl mx-auto mb-8">
          At <span className="font-semibold text-gray-700">HERO.IO</span>, we
          craft innovative apps designed to make everyday life simpler, smarter,
          and more exciting. Our goal is to turn your ideas into digital
          experiences that truly make an impact.
        </p>

        <div className="flex justify-center gap-4 mb-8">
          <a
            href="#"
            className="flex items-center gap-2 border border-gray-300 rounded-lg px-4 py-2 hover:bg-gray-100 transition"
          >
            <FaGooglePlay size={18} className="text-green-500" />
            <span className="font-medium">Google Play</span>
          </a>
          <a
            href="#"
            className="flex items-center gap-2 border border-gray-300 rounded-lg px-4 py-2 hover:bg-gray-100 transition"
          >
            <FaApple size={18} className="text-black" />
            <span className="font-medium">App Store</span>
          </a>
        </div>
        <div className="flex justify-center">
          <img
            src="../../Assignment-8-asset/assets/hero.png"
            alt="App Mockup"
            className="w-[270px] md:w-[600px] drop-shadow-2xl rounded-[2rem]"
          />
        </div>
      </div>

      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-12 text-center">
        <h2 className="text-xl md:text-2xl font-semibold mb-8">
          Trusted By Millions, Built For You
        </h2>
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3  gap-10">
          <div>
            <h3 className="text-4xl font-bold">29.6M</h3>
            <p className="text-sm mt-1">Total Downloads</p>
            <p className="text-xs opacity-80 mt-1">21% More Than Last Month</p>
          </div>
          <div>
            <h3 className="text-4xl font-bold">906K</h3>
            <p className="text-sm mt-1">Total Reviews</p>
            <p className="text-xs opacity-80 mt-1">46% More Than Last Month</p>
          </div>
          <div>
            <h3 className="text-4xl font-bold">132+</h3>
            <p className="text-sm mt-1">Active Apps</p>
            <p className="text-xs opacity-80 mt-1">31 More Will Launch</p>
          </div>
        </div>
      </div>
      <h1 className="text-4xl font-bold text-center mt-10 mb-2">
        Trending Apps
      </h1>
      <h1 className="text-lg text-gray-600 text-center mb-4">
        Explore all trending app on the market developed by us
      </h1>
      <div className="p-10 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 container mx-auto  px-6 max-w-7xl">
        {data.map(
          (app) =>
            app.ratingAvg > 4.4 && (
              <div
                key={app.id}
                className="p-4 border text-black rounded-2xl bg-gray-100"
              >
                <img
                  src={app.image}
                  className="h-[250px] w-[200px]  mx-auto mb-4 p-8 bg-white rounded-2xl"
                  alt=""
                />
                <h2 className="text-lg font-semibold">{app.title}</h2>
                <div className="flex justify-between items-center mt-2">
                  <p className="text-sm text-green-500 my-2 bg-gray-200 p-2 rounded-xl flex items-center gap-1">
                    <GoDownload /> {app.downloads}
                  </p>
                  <p className="text-sm text-red-500 bg-gray-200 my-2 p-2 rounded-xl flex items-center gap-1">
                    <FaStar />
                    {app.ratingAvg}
                  </p>
                </div>
              </div>
            )
        )}
      </div>
      <div className="w-full flex justify-center mt-0 pb-8">
        <button className="text-sm text-white cursor-pointer hover:from-purple-600 hover:to-pink-500 border-blue-500 px-4 py-2 rounded-sm bg-gradient-to-r from-blue-600 to-purple-600 flex items-center gap-2">
          Show All
        </button>
      </div>
    </section>
  );
}
