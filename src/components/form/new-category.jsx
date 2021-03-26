import React, { useState } from "react";

export const NewCategory = ({addNewCategory}) => {
  const [value, setValue] = useState("");

  return (
    <div>
      <label htmlFor="create">Create a new category</label>
      <input
        type="text"
        name="create"
        onChange={e => setValue(e.target.value)}
        value={value}
      />
      <button type="button" onClick={() => {
        addNewCategory(value);
        setValue("");
      }}>
        Add Category
      </button>
    </div>
  );
}
