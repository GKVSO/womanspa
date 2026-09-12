"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

interface GlobalData {
  reviews: any[];
  gallery: any[];
}

const GlobalDataContext = createContext<GlobalData>({ reviews: [], gallery: [] });

export function GlobalDataProvider({
  children,
  initialReviews,
  initialGallery,
}: {
  children: React.ReactNode;
  initialReviews: any[];
  initialGallery: any[];
}) {
  return (
    <GlobalDataContext.Provider value={{ reviews: initialReviews, gallery: initialGallery }}>
      {children}
    </GlobalDataContext.Provider>
  );
}

export function useGlobalData() {
  return useContext(GlobalDataContext);
}
