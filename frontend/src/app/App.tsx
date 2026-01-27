/**
 * App Component
 * Root application component with providers
 */

import { BrowserRouter } from "react-router";
import { AuthProvider } from "./providers/AuthProvider";
import { AppRouter } from "./router";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppRouter />
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
