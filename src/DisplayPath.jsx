import React from 'react';

function DisplayPath({ path }) {
  const { path: cities, totalDistance } = path;
  return (
    <div>
      <h2>Mejor Camino Encontrado</h2>
      <ul>
        {cities.map((city, index) => (
          <li key={index}>{city.getCityName()} ({city.getCityPosition().x}, {city.getCityPosition().y})</li>
        ))}
      </ul>
      <h3>Distancia Total: {totalDistance}</h3>
    </div>
  );
}

export default DisplayPath;
