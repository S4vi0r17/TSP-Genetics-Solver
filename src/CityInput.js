import React, { useState } from 'react';

function CityInput({ onSubmit }) {
  const [input, setInput] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const coords = input.match(/\((\d+),(\d+)\)/g).map(str => str.match(/\d+/g).map(Number));
    onSubmit(coords);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Coordenadas de las ciudades:
        <input type="text" value={input} onChange={(e) => setInput(e.target.value)} />
      </label>
      <button type="submit">Calcular</button>
    </form>
  );
}

export default CityInput;
