// src/config/constants.js
export const API_URL = "http://localhost:5000";

export const STATUS_OPTIONS = [
  { value: "MOR", label: "MOR" },
  { value: "Part A", label: "Part A" },
  { value: "Part B", label: "Part B" },
  { value: "Finished", label: "Finished" },
];

export const EMPTY_FORM = {
  title: "",
  authors: "",
  abstract: "",
  adviser: "",
  critic: "",
  status: "MOR",
  website_url: "",
};