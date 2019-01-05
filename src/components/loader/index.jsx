import React from "react";
import "./_loader.sass";

function Loader() {
  return (
    <div className="loader">
      <div className="spinner" />
        <div className="loader__message">Loading...</div>
    </div>
  );
}

export default Loader;
