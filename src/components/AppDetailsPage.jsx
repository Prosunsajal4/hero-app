import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import ErrorApp from "../components/ErrorApp";
import { ToastContainer, toast } from "react-toastify";

const AppDetailsPage = () => {
  const { id } = useParams();
  const [app, setApp] = useState(null);
  const [isInstalled, setIsInstalled] = useState(false);
  const [loading, setLoading] = useState(true);

  // Fetch app details using local storage or fallback to fetch
  useEffect(() => {
    const storedApps = localStorage.getItem("allApps");
    if (storedApps) {
      const allApps = JSON.parse(storedApps);
      const foundApp = allApps.find((a) => a.id === parseInt(id));
      setApp(foundApp);
      setLoading(false);
    } else {
      // Fallback to fetch if allApps is not in localStorage (simulating loader fallback)
      fetch("/data/apps.json")
        .then((res) => res.json())
        .then((data) => {
          localStorage.setItem("allApps", JSON.stringify(data));
          const foundApp = data.find((a) => a.id === parseInt(id));
          setApp(foundApp);
        })
        .catch((error) => console.error("Error fetching app data:", error))
        .finally(() => setLoading(false));
    }
  }, [id]);

  // Check installation status
  useEffect(() => {
    if (app) {
      const installedApps =
        JSON.parse(localStorage.getItem("installedApps")) || [];
      const alreadyInstalled = installedApps.some((a) => a.id === app.id);
      setIsInstalled(alreadyInstalled);
    }
  }, [app]);

  // Function to handle installation (Replaced alert() with console.log)
  const install = () => {
    const installedApps =
      JSON.parse(localStorage.getItem("installedApps")) || [];
    const alreadyInstalled = installedApps.some((a) => a.id === app.id);

    if (!alreadyInstalled) {
      installedApps.push(app);
      localStorage.setItem("installedApps", JSON.stringify(installedApps));
      toast("App installed successfully!");
      setIsInstalled(true);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
        <div className="w-12 h-12 border-4 border-purple-600 border-t-transparent rounded-full animate-spin"></div>
        <p className="mt-4 text-purple-600 font-medium">Loading App...</p>
      </div>
    );
  }

  if (!app) {
    return (
      <>
        <ErrorApp />
      </>
    );
  }

  const totalReviews = app.ratings.reduce(
    (sum, rating) => sum + rating.count,
    0
  );

  const RatingBar = ({ name, count }) => {
    const percentage = (count / totalReviews) * 100;
    const starNumber = parseInt(name.split(" ")[0]);
    const barColor = starNumber >= 4 ? "bg-orange-500" : "bg-orange-400";

    return (
      <div className="flex items-center space-x-2 my-1">
        <span className="w-16 text-sm text-gray-700">{starNumber} star</span>
        <div className="flex-grow bg-gray-200 rounded-full h-3">
          <div
            className={`h-3 rounded-full ${barColor}`}
            style={{ width: `${percentage}%` }}
          ></div>
        </div>
        <span className="w-16 text-right text-sm text-gray-500">
          {count.toLocaleString()}
        </span>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Header />
      <main className="flex-grow">
        <div className="max-w-4xl mx-auto p-4 md:p-8">
          <div className="flex items-center mb-10 border-b border-gray-200 pb-6">
            <img
              src={app.image}
              alt={`${app.title} icon`}
              className="w-20 h-20 md:w-28 md:h-28 rounded-xl mr-5 border border-gray-200 shadow-md"
            />
            <div>
              <h1 className="text-3xl font-bold text-gray-900">{app.title}</h1>
              <p className="text-gray-500 text-sm mt-1">
                Developed by{" "}
                <span className="font-medium text-indigo-600">
                  {app.companyName}
                </span>
              </p>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4 border-b border-gray-200 pb-6 mb-8 text-center">
            <div className="flex flex-col items-center">
              <img
                src="../../Assignment-8-asset/assets/icon-downloads.png"
                alt="Downloads"
                className="w-12 h-12 mb-1"
              />
              <span className="text-2xl md:text-3xl font-bold text-gray-900">
                {app.downloads}
              </span>
              <span className="text-sm text-gray-500 mt-1">Downloads</span>
            </div>

            <div className="flex flex-col items-center">
              <img
                src="../../Assignment-8-asset/assets/icon-ratings.png"
                alt="Ratings"
                className="w-12 h-12 mb-1"
              />
              <span className="text-2xl md:text-3xl font-bold text-gray-900">
                {app.ratingAvg.toFixed(1)}
              </span>
              <span className="text-sm text-gray-500 mt-1">
                Average Ratings
              </span>
            </div>

            <div className="flex flex-col items-center">
              <img
                src="../../Assignment-8-asset/assets/icon-review.png"
                alt="Reviews"
                className="w-12 h-12 mb-1"
              />
              <span className="text-2xl md:text-3xl font-bold text-gray-900">
                {app.reviews}
              </span>
              <span className="text-sm text-gray-500 mt-1">Total Reviews</span>
            </div>

            <div className="col-span-3 mt-6">
              <button
                onClick={install}
                disabled={isInstalled}
                className={`w-full max-w-xs mx-auto py-3 font-semibold rounded-lg shadow-xl transition duration-200 ${
                  isInstalled
                    ? "bg-gray-400 text-white cursor-not-allowed"
                    : "bg-green-500 hover:bg-green-600 text-white"
                }`}
              >
                {isInstalled ? "Installed" : `Install Now (${app.size})`}
              </button>
            </div>
          </div>

          <div className="mb-10">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              Ratings
            </h2>
            <div className="p-4 border border-gray-200 rounded-lg">
              {app.ratings
                .slice()
                .reverse()
                .map((rating) => (
                  <RatingBar
                    key={rating.name}
                    name={rating.name}
                    count={rating.count}
                  />
                ))}
              <div className="flex justify-between pt-2 mt-2 text-xs text-gray-500 border-t border-gray-200">
                <span>0</span>
                <span>3000</span>
                <span>6000</span>
                <span>9000</span>
                <span>12000</span>
              </div>
            </div>
          </div>

          <div className="mb-10">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              Description
            </h2>
            <p className="text-gray-700 leading-relaxed whitespace-pre-line">
              {app.description}
            </p>
          </div>
        </div>
      </main>
      <Footer />
      <ToastContainer />
    </div>
  );
};

export default AppDetailsPage;
