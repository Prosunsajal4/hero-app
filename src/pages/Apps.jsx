import React, { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useLoaderData, Link } from "react-router-dom";
import { GoDownload } from "react-icons/go";
import { FaStar } from "react-icons/fa";
import AppLoader from "../components/AppLoader";
import { Spinner } from "../components/Spinner";

const Apps = () => {
  const data = useLoaderData();
  const [searchTerm, setSearchTerm] = useState("");
  const [searchLoading, setSearchLoading] = useState(false);

  const filteredApps = data.filter((app) =>
    app.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setSearchLoading(true);
    // Setting a short 500ms delay for a smoother search loading experience
    setTimeout(() => {
      setSearchLoading(false);
    }, 500);
  };

  return (
    <AppLoader>
      <div className="min-h-screen flex flex-col">
        <Header />

        <main className="flex-grow">
          <div className="text-center my-10 space-y-3">
            <h1 className="text-4xl font-bold">Our All Apps</h1>
            <p className="text-gray-600">
              Explore All Apps On The Market Developed By Us. We Code For
              Millions.
            </p>
          </div>

          <div className="flex justify-between items-center max-w-7xl mx-auto px-6 mb-4">
            <h1 className="font-semibold">
              ({filteredApps.length}) Apps Found
            </h1>

            <div className="flex items-center space-x-4">
              <div className="flex items-center gap-2 border border-gray-300 px-3 py-2 rounded-lg bg-white shadow-sm focus-within:ring-2 focus-within:ring-purple-400">
                <svg
                  className="h-5 w-5 text-gray-400"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21 21l-4.3-4.3m0 0A7.5 7.5 0 104.5 4.5a7.5 7.5 0 0012.2 12.2z"
                  />
                </svg>

                <input
                  type="text"
                  placeholder="Search apps..."
                  className="outline-none bg-transparent w-40 md:w-60 text-gray-700 placeholder-gray-400"
                  value={searchTerm}
                  onChange={handleSearch}
                />
              </div>
            </div>
          </div>

          <div className="p-10 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 container mx-auto px-6 max-w-7xl">
            {searchLoading ? (
              <div className="col-span-full flex justify-center py-10">
                <Spinner text="Searching..." />
              </div>
            ) : filteredApps.length > 0 ? (
              filteredApps.map((app) => (
                <Link key={app.id} to={`/app/${app.id}`} className="block">
                  <div className="p-4 border text-black rounded-2xl bg-gray-100 hover:shadow-lg hover:shadow-purple-200 transition duration-300 cursor-pointer h-full">
                    <img
                      src={app.image}
                      className="h-[250px] w-[200px] mx-auto mb-4 p-8 bg-white rounded-2xl"
                      alt={app.title}
                    />
                    <h2 className="text-lg font-semibold text-center">
                      {app.title}
                    </h2>
                    <div className="flex justify-between items-center mt-2">
                      <p className="text-sm text-green-600 my-2 bg-gray-200 px-2 py-1 rounded-xl flex items-center gap-1">
                        <GoDownload /> {app.downloads}
                      </p>
                      <p className="text-sm text-yellow-500 bg-gray-200 my-2 px-2 py-1 rounded-xl flex items-center gap-1">
                        <FaStar /> {app.ratingAvg}
                      </p>
                    </div>
                  </div>
                </Link>
              ))
            ) : (
              <div className="col-span-full flex flex-col items-center">
                <img
                  src="../../Assignment-8-asset/assets/App-Error.png"
                  alt="No apps found illustration"
                  className="max-w-xs w-full"
                />
                <p className="text-center text-gray-500 mt-4 text-lg">
                  No apps found for "{searchTerm}"
                </p>
              </div>
            )}
          </div>
        </main>

        <Footer />
      </div>
    </AppLoader>
  );
};

export default Apps;
