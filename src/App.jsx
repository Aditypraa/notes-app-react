import { AuthProvider } from "./contexts/authContext";
import { ThemeProvider } from "./contexts/themeContext";
import { LocaleProvider } from "./contexts/localeContext";
import AppRoutes from "./routes";
import { BrowserRouter } from "react-router";

function App() {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <LocaleProvider>
          <AuthProvider>
            <AppRoutes />
          </AuthProvider>
        </LocaleProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
