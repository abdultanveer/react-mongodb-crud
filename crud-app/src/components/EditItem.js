import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const EditItem = () => {
   const { id } = useParams();
   const [name, setName] = useState('');
   const [description, setDescription] = useState('');

   useEffect(() => {
      const fetchItem = async () => {
         try {
            const response = await axios.get(`http://localhost:5000/items/${id}`);
            setName(response.data.name);
            setDescription(response.data.description);
         } catch (error) {
            console.error('There was an error fetching the item!', error);
         }
      };
      fetchItem();
   }, [id]);

   const handleSubmit = async (e) => {
      e.preventDefault();
      const updatedItem = { name, description };
      try {
         await axios.put(`http://localhost:5000/items/${id}`, updatedItem);
      } catch (error) {
         console.error('There was an error updating the item!', error);
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
         <button type="submit">Update Item</button>
      </form>
   );
};

export default EditItem;
