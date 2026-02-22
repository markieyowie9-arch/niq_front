// components/BootstrapClient.jsx
"use client";

import { useEffect } from "react";

export default function BootstrapClient() {
  useEffect(() => {
    // This ensures Bootstrap's JavaScript only loads on the client side
    try {
      require("bootstrap/dist/js/bootstrap.bundle.min.js");
      console.log("Bootstrap JS loaded successfully");
    } catch (error) {
      console.error("Failed to load Bootstrap JS:", error);
    }
  }, []);

  return null;
}
