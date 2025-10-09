import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { GoDownload } from "react-icons/go";
import { FaStar } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import AppLoader from "../components/AppLoader";
import { Spinner } from "../components/Spinner";

const Installation = () => {
  const [installedApps, setInstalledApps] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortType, setSortType] = useState("size");
  const [loading, setLoading] = useState(true);
  const [searchLoading, setSearchLoading] = useState(false);

  const loadInstalledApps = () => {
    try {
      const storedApps = localStorage.getItem("installedApps");
      if (storedApps) {
        setInstalledApps(JSON.parse(storedApps));
      } else {
        setInstalledApps([]);
      }
    } catch (error) {
      console.error("Error loading installed apps:", error);
      setInstalledApps([]);
    } finally {
      setTimeout(() => {
        setLoading(false);
      }, 500); 
    }
  };

  useEffect(() => {
    loadInstalledApps();
  }, []);

  const handleUninstall = (appId) => {
    const uninstalledApp = installedApps.find((app) => app.id === appId);
    const updatedApps = installedApps.filter((app) => app.id !== appId);

    localStorage.setItem("installedApps", JSON.stringify(updatedApps));

    setInstalledApps(updatedApps);
    toast.info(`'${uninstalledApp.title}' uninstalled and removed from list.`);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setSearchLoading(true);

    setTimeout(() => {
      setSearchLoading(false);
    }, 500);
  };

  const handleSortChange = (e) => {
    setSortType(e.target.value);
    setSearchLoading(true);
    setTimeout(() => {
      setSearchLoading(false);
    }, 500);
  };

  const getNumericSize = (sizeString) => {
    if (!sizeString) return 0;
    const parts = sizeString.split(" ");
    const number = parseFloat(parts[0]);
    if (parts[1] === "MB") return number;
    if (parts[1] === "GB") return number * 1024;
    return number;
  };

  let displayedApps = installedApps.filter((app) =>
    app.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  displayedApps.sort((a, b) => {
    if (sortType === "rating") {
      return b.ratingAvg - a.ratingAvg;
    } else if (sortType === "downloads(high to low)") {
      const parseDownloads = (downloads) => {
        const num = parseFloat(downloads.replace(/k|m/i, ""));
        if (downloads.toLowerCase().includes("m")) return num * 1000000;
        if (downloads.toLowerCase().includes("k")) return num * 1000;
        return num;
      };

      const valueA = parseDownloads(a.downloads);
      const valueB = parseDownloads(b.downloads);

      return valueB - valueA;
    } else if (sortType === "size") {
      const sizeA = getNumericSize(a.size);
      const sizeB = getNumericSize(b.size);
      return sizeB - sizeA;
    } else if (sortType === "downloads(low to high)") {
      const parseDownloads = (downloads) => {
        const num = parseFloat(downloads.replace(/k|m/i, ""));
        if (downloads.toLowerCase().includes("m")) return num * 1000000;
        if (downloads.toLowerCase().includes("k")) return num * 1000;
        return num;
      };

      const valueA = parseDownloads(a.downloads);
      const valueB = parseDownloads(b.downloads);

      return valueA - valueB;
    }
    return 0;
  });

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50"> 
        <Spinner text="Loading Installed Apps..." />
      </div>
    );
  }

  const AppListItem = ({ app }) => (
    <div className="flex items-center justify-between p-4 border border-gray-200 rounded-xl bg-white shadow-sm mb-4">
      <div className="flex items-center space-x-4 flex-grow">
        <div className="w-14 h-14 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0 border">
          <img
            src={app.image}
            alt={app.title}
            className="w-10 h-10 rounded-lg"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src =
                "https://placehold.co/40x40/f3f4f6/374151?text=App";
            }}
          />
        </div>

        <div className="flex flex-col min-w-0">
          <h3 className="text-base font-semibold text-gray-800 truncate">
            {app.title}
          </h3>
          <div className="flex items-center space-x-3 text-xs text-gray-500 mt-1">
            <span className="flex items-center gap-1">
              <GoDownload className="text-green-500" /> {app.downloads}
            </span>
            <span className="flex items-center gap-1">
              <FaStar className="text-yellow-500" /> {app.ratingAvg.toFixed(1)}
            </span>
            <span>{app.size}</span>
          </div>
        </div>
      </div>

      <button
        onClick={() => handleUninstall(app.id)}
        className="ml-4 px-3 py-1 bg-red-500 hover:bg-red-600 text-white font-medium rounded-full text-sm transition duration-150 shadow-md"
      >
        Uninstall
      </button>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <AppLoader>
        <Header />

        <main className="flex-grow max-w-4xl mx-auto w-full px-4 py-10">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900">
              Your Installed Apps
            </h1>
            <p className="text-gray-500 mt-2">
              Manage all the applications installed on your device.
            </p>
          </div>

          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-semibold text-gray-700">
              {displayedApps.length} Apps Found
            </h2>

            <div className="flex items-center space-x-4">
              <div className="flex items-center gap-2 border border-gray-300 px-3 py-1 rounded-lg bg-white shadow-sm focus-within:ring-2 focus-within:ring-purple-400">
                <svg
                  className="h-4 w-4 text-gray-400"
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
                  placeholder="Search installed apps..."
                  className="outline-none bg-transparent w-40 text-sm text-gray-700 placeholder-gray-400"
                  value={searchTerm}
                  onChange={handleSearchChange}
                />
              </div>

              <select
                className="border border-gray-300 rounded-lg p-2 text-sm text-gray-700 focus:ring-purple-400 focus:border-purple-400"
                value={sortType}
                onChange={handleSortChange}
              >
                <option value="size">Sort By Size</option>
                <option value="rating">Sort By Rating</option>
                <option value="downloads(low to high)">
                  Sort By Downloads (Low to High)
                </option>
                <option value="downloads(high to low)">
                  Sort By Downloads (High to Low)
                </option>
              </select>
            </div>
          </div>

          <div className="space-y-3">
            {searchLoading ? (
              <div className="flex justify-center w-full py-10">
                <Spinner text={`Searching/Sorting...`} />
              </div>
            ) : displayedApps.length > 0 ? (
              displayedApps.map((app) => <AppListItem key={app.id} app={app} />)
            ) : (
              <div className="p-10 text-center text-gray-500 bg-white border border-dashed border-gray-300 rounded-xl mt-10">
                <p className="text-lg font-medium">
                  {searchTerm
                    ? `No apps found matching "${searchTerm}"`
                    : "No Apps Installed Yet."}
                </p>
                {!searchTerm && (
                  <p className="text-sm mt-1">
                    Visit the{" "}
                    <a href="/apps" className="text-indigo-600 hover:underline">
                      Apps page
                    </a>{" "}
                    to start installing!
                  </p>
                )}
              </div>
            )}
          </div>
        </main>

        <Footer />
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
      </AppLoader>
    </div>
  );
};

export default Installation;
