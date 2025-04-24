"use client";

import Loader from "@/components/loader/loader";
import { createContext, useContext, useState, ReactNode } from "react";

const LoaderContext = createContext({
  loader: false,
  showLoader: () => {},
  hideLoader: () => {},
});

export const LoaderProvider = ({ children }: { children: ReactNode }) => {
  const [loader, setLoader] = useState(false);

  const showLoader = () => setLoader(true);
  const hideLoader = () => setLoader(false);

  return (
    <LoaderContext.Provider value={{ loader, showLoader, hideLoader }}>
      {children}
      {loader && (
        <div className="fixed inset-0 flex items-center justify-center backdrop-blur-sm z-[9999]">
          <Loader />
        </div>
      )}
    </LoaderContext.Provider>
  );
};

export const useLoader = () => useContext(LoaderContext);
