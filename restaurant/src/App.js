import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import { Link as ScrollLink } from "react-scroll";
//import Home from './component/pages/Home';
import LoginForm from "./component/auth/login";
import RegisterForm from "./component/auth/signUp";
import Home from "./component/pages/Home";
import AddFormation from "./component/pages/Formations";
import Profil from "./component/pages/Profil";

function App() {
  const userRole = localStorage.getItem("userRole");
  console.log("Rôle récupéré depuis localStorage :", userRole); // 🔍 Vérifie après stockage

  return (
    <Router>
      <nav>
        <Link to="/Home">
          <h1>
            NEXT<span>CODE</span>
          </h1>
        </Link>
        {/* <ScrollLink to="menu" smooth={true} duration={500}>
          Formation
        </ScrollLink>
        <Link to="/login">Login</Link>
        <Link to="/register">Register</Link> */}
        <ul className="navigation">
          <li>
            <Link to="/add-dish" className="navLink">
              Formations
            </Link>
          </li>
          <li>
            <Link to="/register" className="navLink">
              Inscriptions
            </Link>
          </li>
          <li>
            <Link to="/login">Connexion</Link>
          </li>
          <li>
            <Link to="/Profil" className="navLink btn">
              Profil
            </Link>
          </li>
        </ul>
        {userRole && userRole.toLowerCase() === "admin" && (
          <Link to="/add-dish">Ajouter une Formation</Link>
        )}
      </nav>
      <Routes>
        <Route path="/Home" element={<Home />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/register" element={<RegisterForm />} />
        <Route path="/add-dish" element={<AddFormation />} />
        <Route path="/Profil" element={<Profil />} />
      </Routes>
    </Router>
  );
}

export default App;
