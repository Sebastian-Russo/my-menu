import React, { useState } from 'react';

const cats = ['lunch', 'dinner', 'breakfast', 'snacks']

export const Checkbox = ({handleCategories}) => {
  const [array, setArray] = useState([]);

  const handleCheckbox = e => {
    let {target} = e; 
    if (target.checked) {
      setArray([...array, target.value])
    } else {
      setArray(array.filter(item => item !== target.value))
    }

    handleCategories(array)
  }
  
  const list = cats.map((c,i) => {
    return (
      <div key={i}>
        <input type="checkbox" name={c} onChange={handleCheckbox} value={c}/>
        <label htmlFor={c}>{c}</label>
      </div>
    )
  })
  
  return (
    <div>
      {list}
    </div>
  )
}