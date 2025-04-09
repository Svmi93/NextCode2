// import { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { useAuth } from "../../hooks/useAuth";
// import "./Home.css";
// import usePlats from "../../hooks/usePlats";
// import React, { useEffect } from "react";

// function Home() {
//   const { user } = useAuth();
//   const { plats } = usePlats();

//   useEffect(() => {
//     console.log("Plats mis à jour :", plats);
//   }, [plats]);

//   return (
//     <div className="container">
//       <header>
//         <h1>Un Apprentissage Immersif</h1>
//       </header>
//       <section className="welcome">
//         <h2>Bonjour, {user ? user.name : "Invité"}!</h2>
//         <p>
//           Apprends en pratiquant et en collaborant avec des experts du domaine
//           pour maîtriser les compétences clés.
//         </p>
//       </section>

//       <section id="about" className="about">
//         <h2>Bienvenue sur NEXTCODE</h2>
//         <p>
//           Bienvenue chez <strong>NEXTCODE</strong>, 💡 Nos formations sont
//           basées sur des exercices pratiques et des études de cas réels pour
//           maximiser ton apprentissage.
//         </p>
//         <div className="about-info">
//           <div className="about-item">
//             <h3>Variétés</h3>
//             <p>
//               Retrouvez un large choix de formations dans le domaine du web
//               ainsi que sur les outils les plus utlisés par les développeurs{" "}
//             </p>
//           </div>
//           <div className="about-item">
//             <h3>Flexible</h3>
//             <p>
//               📆 Apprends quand tu veux, où tu veux, avec un accès 24/7 aux
//               ressources pédagogiques et aux supports de cours.
//             </p>
//           </div>
//           <div className="about-item">
//             <h3>Communautaire</h3>
//             <p>
//               🌍 Rejoins une communauté d’apprenants et échange avec des mentors
//               expérimentés pour progresser plus rapidement.
//             </p>
//           </div>
//         </div>

//         <section className="menu">
//           <h2>Formations</h2>
//           <div className="menu-grid">
//             {plats.length > 0 ? (
//               plats.map((plat) => (
//                 <div key={plat.id_plat} className="menu-item">
//                   <h3>{plat.nom}</h3>
//                   <p>{plat.description}</p>
//                   <p>
//                     <strong>Prix :</strong> {plat.prix} €
//                   </p>
//                 </div>
//               ))
//             ) : (
//               <p>Chargement des Formations disponibles...</p>
//             )}
//           </div>
//         </section>
//       </section>

//       <footer>
//         <p>&copy; 2025 NEXTCODE. Tous droits réservés.</p>
//       </footer>
//     </div>
//   );
// }

// export default Home;

// import { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
import { useAuth } from "../../hooks/useAuth";
import "./Home.css";
import useFormations from "../../hooks/useFormations";
import React, { useEffect } from "react";

function Home() {
  const { user } = useAuth();
  const { formations } = useFormations();

  useEffect(() => {
    console.log("Formations mises à jour :", formations);
  }, [formations]);

  return (
    <div className="container">
      <header>
        <h1>Un Apprentissage Immersif</h1>
      </header>
      <section className="welcome">
        <h2>Bonjour, {user ? user.name : "Invité"}!</h2>
        <p>
          Apprends en pratiquant et en collaborant avec des experts du domaine
          pour maîtriser les compétences clés.
        </p>
      </section>

      <section id="about" className="about">
        <h2>
          Bienvenue sur NEXT<span>CODE</span>
        </h2>
        <p>
          Bienvenue chez{" "}
          <strong>
            NEXT<span>CODE</span>
          </strong>
          , 💡 Nos formations sont basées sur des exercices pratiques et des
          études de cas réels pour maximiser ton apprentissage.
        </p>
        <div className="about-info">
          <div className="about-item">
            <h3>Variétés</h3>
            <p>
              Retrouvez un large choix de formations dans le domaine du web
              ainsi que sur les outils les plus utlisés par les développeurs{" "}
            </p>
          </div>
          <div className="about-item">
            <h3>Flexible</h3>
            <p>
              📆 Apprends quand tu veux, où tu veux, avec un accès 24/7 aux
              ressources pédagogiques et aux supports de cours.
            </p>
          </div>
          <div className="about-item">
            <h3>Communautaire</h3>
            <p>
              🌍 Rejoins une communauté d’apprenants et échange avec des mentors
              expérimentés pour progresser plus rapidement.
            </p>
          </div>
        </div>

        <section className="lesson">
          <h2>Formations</h2>
          <div className="lesson-grid">
            {formations.length > 0 ? (
              formations.map((formation) => (
                <div key={formation.id_formation} className="lesson-item">
                  <h3>{formation.nom}</h3>
                  <p>{formation.description}</p>
                  <p>
                    <strong>Prix :</strong> {formation.prix} €
                  </p>
                </div>
              ))
            ) : (
              <p>Chargement des Formations disponibles...</p>
            )}
          </div>
        </section>
      </section>

      <footer>
        <p>&copy; 2025 NEXTCODE. Tous droits réservés.</p>
      </footer>
    </div>
  );
}

export default Home;
