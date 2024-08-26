import React from 'react';
import CreateItem from './components/CreateItem';
import ItemList from './components/ItemList';
import EditItem from './components/EditItem';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

const App = () => {
   return (
      <Router>
         <div className="App">
            <Routes>
               <Route path="/" element={<ItemList />} />
               <Route path="/create" element={<CreateItem />} />
               <Route path="/edit/:id" element={<EditItem />} />
            </Routes>
         </div>
      </Router>
   );
};

export default App;
