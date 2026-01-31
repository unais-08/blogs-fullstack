/**
 * App Component
 * Root application component with providers
 */

import { BrowserRouter } from "react-router";
import { AuthProvider } from "./providers/AuthProvider";
import { AppRouter } from "./router";
import { BlogProvider } from "@/features/blogs/context/BlogContext";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <BlogProvider>
          <AppRouter />
        </BlogProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
