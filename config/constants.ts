export const APP_NAME = "AutoHost Cloud Lite";
export const APP_DESCRIPTION = "Secure Server Management";

// Cookie names
export const COOKIES = {
  ACCESS_TOKEN: "access_token",
} as const;

// API endpoints
export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: "/v1/auth/login",
    REGISTER: "/v1/auth/register",
    LOGOUT: "/v1/auth/logout",
    ME: "/v1/auth/me",
    REFRESH: "/v1/auth/refresh",
  },
  NODES: {
    LIST: "/v1/nodes",
    DETAIL: (id: string) => `/v1/nodes/${id}`,
  },
} as const;

// Environment variables
export const ENV = {
  BACKEND_URL: process.env.BACKEND_URL || "http://localhost:8080",
  NODE_ENV: process.env.NODE_ENV || "development",
  IS_PRODUCTION: process.env.NODE_ENV === "production",
} as const;
