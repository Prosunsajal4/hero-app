// src/components/AppLoader.jsx
import React, { useState, useEffect } from "react";
import { useNavigation } from "react-router-dom";
import { Spinner } from "./Spinner";

export default function AppLoader({ children }) {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (navigation.state === "loading") {
      setLoading(true);
    } else {
      setLoading(false);
    }
  }, [navigation.state]);

  if (loading) {
    return <Spinner text="Loading Page..." />;
  }

  return children;
}
