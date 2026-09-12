"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

interface GlobalData {
  reviews: any[];
  gallery: any[];
  consultation: any;
}

const GlobalDataContext = createContext<GlobalData>({ reviews: [], gallery: [], consultation: {} });

export function GlobalDataProvider({
  children,
  initialReviews,
  initialGallery,
  initialConsultation,
}: {
  children: React.ReactNode;
  initialReviews: any[];
  initialGallery: any[];
  initialConsultation?: any;
}) {
  return (
    <GlobalDataContext.Provider value={{ reviews: initialReviews, gallery: initialGallery, consultation: initialConsultation || {} }}>
      {children}
    </GlobalDataContext.Provider>
  );
}

export function useGlobalData() {
  return useContext(GlobalDataContext);
}
