// import React from "react";
// import usePlats from "../../hooks/useFormations";
// import "../../style/usePlats.css";

// function AddFormation() {
//   const { formData, handleChange, handleSubmit, message, loading } = usePlats(); // Utilisation du Hook

//   return (
//     <div className="add-dish-container">
//       <h2>Ajouter une Formation</h2>
//       {message && <p className="message">{message}</p>}
//       <form onSubmit={handleSubmit} className="add-dish-form">
//         <div className="input-group">
//           <label>Intitulé de la formation</label>
//           <input
//             type="text"
//             name="nom"
//             value={formData.nom}
//             onChange={handleChange}
//             required
//           />
//         </div>

//         {/* Nouveau champ pour l'image */}
//         <div className="input-group">
//           <label>Image de la formation</label>
//           <input
//             type="file"
//             name="image"
//             accept="image/*"
//             onChange={handleChange}
//           />
//         </div>

//         <div className="input-group">
//           <label>Prix (€)</label>
//           <input
//             type="number"
//             name="prix"
//             value={formData.prix}
//             onChange={handleChange}
//             required
//           />
//         </div>

//         <div className="input-group">
//           <label>Description</label>
//           <textarea
//             name="description"
//             value={formData.description}
//             onChange={handleChange}
//             required
//           />
//         </div>

//         {/* Nouveau champ pour un fichier texte */}
//         <div className="input-group">
//           <label>Cours sous format texte</label>
//           <input
//             type="file"
//             name="fichierTexte"
//             accept=".txt"
//             onChange={handleChange}
//           />
//         </div>

//         <button type="submit" className="btn" disabled={loading}>
//           {loading ? "Ajout en cours..." : "Ajouter la formation"}
//         </button>
//       </form>
//     </div>
//   );
// }

// export default AddFormation;

import React from "react";
import useFormations from "../../hooks/useFormations";
import "../../style/useFormations.css";

function AddFormation() {
  const { formData, handleChange, handleSubmit, message, loading } =
    useFormations(); // Utilisation du Hook

  return (
    <div className="add-formation-container">
      <h2>Ajouter une Formation</h2>
      {message && <p className="message">{message}</p>}
      <form onSubmit={handleSubmit} className="add-formation-form">
        <div className="input-group">
          <label>Intitulé de la formation</label>
          <input
            type="text"
            name="nom"
            value={formData.nom}
            onChange={handleChange}
            required
          />
        </div>

        {/* Nouveau champ pour l'image */}
        <div className="input-group">
          <label>Image de la formation</label>
          <input
            type="file"
            name="image"
            accept="image/*"
            onChange={handleChange}
          />
        </div>

        <div className="input-group">
          <label>Prix (€)</label>
          <input
            type="number"
            name="prix"
            value={formData.prix}
            onChange={handleChange}
            required
          />
        </div>

        <div className="input-group">
          <label>Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
          />
        </div>

        {/* Nouveau champ pour un fichier texte */}
        {/* <div className="input-group">
          <label>Cours sous format texte</label>
          <input
            type="file"
            name="fichierTexte"
            accept=".txt"
            onChange={handleChange}
          />
        </div> */}

        <button type="submit" className="btn" disabled={loading}>
          {loading ? "Ajout en cours..." : "Ajouter la formation"}
        </button>
      </form>
    </div>
  );
}

export default AddFormation;
