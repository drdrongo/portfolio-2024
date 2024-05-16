import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import dotenv from "dotenv";

dotenv.config(); // load env vars from .env

export default defineConfig(() => {
  return {
    plugins: [react()],
    base: "/portfolio-2024/",
  };
});
