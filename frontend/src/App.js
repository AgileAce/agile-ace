import './Resources/CSS/bootstrap.css';
import './Resources/CSS/main_page.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import GamePage from "./Pages/Game.page";
import HomePage from "./Pages/Home.page";
import Navbar from "./Components/Navbar.component";
import {URL_ROUTES} from "./Resources/UTILS/URL_ROUTES.routes";
import LoginPage from "./Pages/Login.page";
import SignupPage from "./Pages/Signup.page";
import NotfoundPage from "./Pages/Signup.page";
import {ThemeProvider} from "./Contexts/Theme.context";

function App() {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <Navbar />
          <Routes>
            <Route path={URL_ROUTES.HOME} element={<HomePage />} />
            <Route path={URL_ROUTES.GAME} element={<GamePage />} />
            <Route path={URL_ROUTES.LOGIN} element={<LoginPage />} />
            <Route path={URL_ROUTES.SIGNUP} element={<SignupPage />} />
            <Route path={URL_ROUTES.NOTFOUND} element={<NotfoundPage />} />
          </Routes>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
