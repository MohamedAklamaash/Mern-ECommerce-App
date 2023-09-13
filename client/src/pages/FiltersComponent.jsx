import React, { useState } from "react";

const FiltersComponent = () => {
  const [filteredPrice, setfilteredPrice] = useState("");
  return (
    <div>
      <label>Price</label>
      <input
        type="range"
        step="50"
        min="100"
        max="100000"
        onChange={(event) => setfilteredPrice(event.target.value)}
      />
      <label>
        {"Maximum Price:"}
        {filteredPrice}
      </label>
      {console.log(filteredPrice)}
      <div>
        <h2>Category</h2>
      </div>
    </div>
  );
};

export default FiltersComponent;
