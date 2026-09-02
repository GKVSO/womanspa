"use client";

import React, { createContext, useContext, useState } from "react";
import BookingModal from "./BookingModal";

interface BookingModalContextValue {
  openModal: () => void;
  closeModal: () => void;
  isOpen: boolean;
}

const BookingModalContext = createContext<BookingModalContextValue | null>(null);

export function BookingModalProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  return (
    <BookingModalContext.Provider value={{ openModal, closeModal, isOpen }}>
      {children}
      <BookingModal open={isOpen} onClose={closeModal} />
    </BookingModalContext.Provider>
  );
}

export function useBookingModal() {
  const ctx = useContext(BookingModalContext);
  if (!ctx) {
    throw new Error("useBookingModal must be used within BookingModalProvider");
  }
  return ctx;
}
