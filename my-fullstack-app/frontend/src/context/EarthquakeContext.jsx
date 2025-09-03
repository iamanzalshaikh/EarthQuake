import React, { createContext, useContext, useReducer, useEffect } from "react";
import axios from "axios";
import { serverUrl } from "../App";

const EarthquakeContext = createContext();

const initialState = {
  earthquakes: [],
  loading: true,
  error: null,
  filter: "all",
  totalCount: 0,
  lastUpdated: null,
};

function reducer(state, action) {
  switch (action.type) {
    case "SET_LOADING":
      return { ...state, loading: true, error: null };
    case "SET_DATA":
      return {
        ...state,
        earthquakes: action.payload.features || [],
        totalCount: action.payload.metadata?.count || 0,
        lastUpdated: new Date().toISOString(),
        loading: false,
        error: null,
      };
    case "SET_ERROR":
      return { ...state, error: action.payload, loading: false };
    case "SET_FILTER":
      return { ...state, filter: action.payload };
    default:
      return state;
  }
}

export function useEarthquake() {
  return useContext(EarthquakeContext);
}

export function EarthquakeProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const fetchEarthquakes = async (mag = state.filter) => {
    try {
      dispatch({ type: "SET_LOADING" });
      const res = await axios.get(`${serverUrl}/api/earthquakes`, {
        params: { magnitude: mag },
      });
      dispatch({ type: "SET_DATA", payload: res.data });
    } catch (err) {
      dispatch({ type: "SET_ERROR", payload: "Failed to fetch data" });
    }
  };

  const setFilter = (filter) => {
    localStorage.setItem("eqFilter", filter); // 🔹 persist filter
    dispatch({ type: "SET_FILTER", payload: filter });
    fetchEarthquakes(filter);
  };

  useEffect(() => {
    // 🔹 Load saved filter on mount
    const savedFilter = localStorage.getItem("eqFilter") || "all";
    dispatch({ type: "SET_FILTER", payload: savedFilter });
    fetchEarthquakes(savedFilter);

    // 🔹 Auto refresh every 5 min
    const interval = setInterval(() => fetchEarthquakes(state.filter), 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <EarthquakeContext.Provider value={{ ...state, fetchEarthquakes, setFilter }}>
      {children}
    </EarthquakeContext.Provider>
  );
}
