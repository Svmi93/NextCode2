import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
// import { Link as ScrollLink } from "react-scroll";
//import Home from './component/pages/Home';
import LoginForm from "./component/auth/login";
import RegisterForm from "./component/auth/signUp";
import Home from "./component/pages/Home";
import AddFormation from "./component/pages/Formations";
import Profil from "./component/pages/Profil";
import { useState } from "react";
import Paiement from './component/pages/paiement';

function App() {
  const [menuOpen, setMenuOpen] = useState(false); // État pour gérer l'ouverture du menu
  const userRole = localStorage.getItem("userRole");

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <Router>
      <nav className="navbar">
        <Link to="/Home" className="logo">
          <h1>
            NEXT<span>CODE</span>
          </h1>
        </Link>
        <div
          className={`menu-toggle ${menuOpen ? "open" : ""}`}
          onClick={toggleMenu}
        >
          <div className="bar"></div>
          <div className="bar"></div>
          <div className="bar"></div>
        </div>
        <ul className={`navigation ${menuOpen ? "active" : ""}`}>
          {/* <li>
            <Link to="/add-dish" className="navLink" onClick={toggleMenu}>
              Formations
            </Link>
          </li> */}
          <li>
            <Link to="/register" className="navLink" onClick={toggleMenu}>
              Inscriptions
            </Link>
          </li>
          <li>
            <Link to="/login" className="navLink" onClick={toggleMenu}>
              Connexion
            </Link>
          </li>
          {userRole && (
            <li>
              <Link to="/Profil" className="navLink btn" onClick={toggleMenu}>
                Profil
              </Link>
            </li>
          )}
        </ul>
        {userRole && userRole.toLowerCase() === "admin" && (
          <Link to="/add-dish" className="admin-link">
            Ajouter une Formation
          </Link>
        )}
      </nav>
      <Routes>
        <Route path="/Home" element={<Home />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/register" element={<RegisterForm />} />
        <Route path="/add-dish" element={<AddFormation />} />
        <Route path="/Profil" element={<Profil />} />
        <Route path="/paiement/:id" element={<Paiement />} />
      </Routes>
    </Router>
  );
}

export default App;
