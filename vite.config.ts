import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

export default defineConfig(() => {
  return {
    define: {
      "process.env.GMAIL_APP_PASSWORD": JSON.stringify(
        import.meta.env.GMAIL_APP_PASSWORD
      ),
    },
    plugins: [react()],
    base: "/portfolio-2024/",
  };
});
