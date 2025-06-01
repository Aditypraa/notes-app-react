import { AuthProvider } from "./contexts/authContext";
import AppRoutes from "./routes";
import { BrowserRouter } from "react-router";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
