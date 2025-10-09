import React from "react";
import Header from "./Header";
import Footer from "./Footer";

const ErrorApp = () => {
  const handleGoBack = () => {
    window.history.back();
  };
  const ERROR_ILLUSTRATION_URL =
    "../../Assignment-8-asset/assets/App-Error.png";
  return (
    <div>
      <Header></Header>
      <main className="flex-grow flex flex-col justify-center items-center text-center p-8">
        <div className="mb-10">
          <img
            src={ERROR_ILLUSTRATION_URL}
            alt="404 Error: Disconnected illustration"
            className="max-w-xs md:max-w-md h-auto"
          />
        </div>

        <h1 className="text-4xl md:text-5xl font-bold mb-3 text-red-700">
          Oops App not found!
        </h1>

        <p className="text-lg text-gray-600 mb-8">
          The app you are looking for is not available.
        </p>

        <button
          onClick={handleGoBack}
          className="
                        px-8 py-3 
                        text-white text-lg font-medium 
                        bg-[#9370db] rounded-lg 
                        shadow-md 
                        hover:bg-[#7d57d9] 
                        transition duration-300 ease-in-out
                        focus:outline-none focus:ring-2 focus:ring-[#9370db] focus:ring-opacity-50
                    "
        >
          Go Back!
        </button>
      </main>

      <Footer> </Footer>
    </div>
  );
};

export default ErrorApp;
