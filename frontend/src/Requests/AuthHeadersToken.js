// src/api/headers.js
const API_TOKEN = process.env.REACT_APP_API_TOKEN;

export const AuthHeadersToken = () => ({
  "Content-Type": "application/json",
  Authorization: API_TOKEN,
});
