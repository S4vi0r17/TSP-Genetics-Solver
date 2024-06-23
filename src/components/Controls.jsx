import React from 'react';

const Controls = ({ findPath }) => {
  return (
    <div className="controls">
      <button onClick={findPath}>Find Path</button>
      <p id="status"></p>
    </div>
  );
};

export default Controls;
