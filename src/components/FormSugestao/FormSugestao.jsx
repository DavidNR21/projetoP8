import { useState } from 'react';
import './stylesSugestao.css';


function FormSugestao() {

    
  const [animeName, setAnimeName] = useState('');
  const [season, setSeason] = useState('');
  const [year, setYear] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('Sugestão enviada:', {
      animeName,
      season,
      year,
    });

    // Limpar campos após o envio
    setAnimeName('');
    setSeason('');
    setYear('');
  };

  return (
    <div className="form-sugestao">
      <h3 className="form-sugestao-h3">Sugestão de Conteúdo</h3>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="animeName">Nome do Anime:</label>
          <input
            type="text"
            id="animeName"
            value={animeName}
            onChange={(e) => setAnimeName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="season">Temporada:</label>
          <input
            type="text"
            id="season"
            value={season}
            onChange={(e) => setSeason(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="year">Ano:</label>
          <input
            type="number"
            id="year"
            value={year}
            onChange={(e) => setYear(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="submit-btn">Enviar Sugestão</button>
      </form>
    </div>
  );
}

export default FormSugestao;


