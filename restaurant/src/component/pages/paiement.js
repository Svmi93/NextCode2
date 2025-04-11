import { useParams, useNavigate } from 'react-router-dom';
import '../pages/paiement.css';

const Paiement = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Paiement effectué avec succès ! 🎉');
    navigate('/');
  };

  return (
    <div className="paiement-container">
      <h1>Paiement</h1>
      <p>Formation sélectionnée : <strong>#{id}</strong></p>

      <form className="paiement-form" onSubmit={handleSubmit}>
        <label>Nom complet</label>
        <input type="text" placeholder="Jean Dupont" required />

        <label>Adresse email</label>
        <input type="email" placeholder="jean@example.com" required />

        <label>Numéro de carte</label>
        <input type="text" placeholder="1234 5678 9012 3456" maxLength={19} required />

        <label>Date d’expiration</label>
        <input type="text" placeholder="MM/AA" maxLength={5} required />

        <label>Cryptogramme (CVV)</label>
        <input type="text" placeholder="123" maxLength={3} required />

        <button type="submit" className="btn">Valider le paiement</button>
      </form>
    </div>
  );
};

export default Paiement;

