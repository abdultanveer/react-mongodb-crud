import React, { useState } from 'react';
import axios from 'axios';

const CreateItem = () => {
   const [name, setName] = useState('');
   const [description, setDescription] = useState('');

   const handleSubmit = async (e) => {
      e.preventDefault();
      const newItem = { name, description };
      try {
         await axios.post('http://localhost:5000/items', newItem);
         setName('');
         setDescription('');
      } catch (error) {
         console.error('There was an error creating the item!', error);
      }
   };

   return (
      <form onSubmit={handleSubmit}>
         <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Name"
            required
         />
         <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Description"
         ></textarea>
         <button type="submit">Add Item</button>
      </form>
   );
};

export default CreateItem;
