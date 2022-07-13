import React from 'react';

function Preloader() {
  return (
    <div className="preload">
      <div className="lds-ring">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
}

export default Preloader;
