const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const Item = require('./models/Item');




const app = express();
app.use(cors());
app.use(bodyParser.json());

mongoose.connect('mongodb://localhost:27017/crudapp', { useNewUrlParser: true, useUnifiedTopology: true })
   .then(() => console.log('MongoDB connected'))
   .catch(err => console.log(err));

const port = 5000;
app.listen(port, () => console.log(`Server running on port ${port}`));


// Create Item
app.post('/items', (req, res) => {
    const newItem = new Item(req.body);
    newItem.save()
       .then(item => res.json(item))
       .catch(err => res.status(400).json('Error: ' + err));
 });
 
 // Read Items
 app.get('/items', (req, res) => {
    Item.find()
       .then(items => res.json(items))
       .catch(err => res.status(400).json('Error: ' + err));
 });
 
 // Update Item
 app.put('/items/:id', (req, res) => {
    Item.findById(req.params.id)
       .then(item => {
          item.name = req.body.name;
          item.description = req.body.description;
          item.save()
             .then(() => res.json('Item updated!'))
             .catch(err => res.status(400).json('Error: ' + err));
       })
       .catch(err => res.status(400).json('Error: ' + err));
 });
 
 // Delete Item
 app.delete('/items/:id', (req, res) => {
    Item.findByIdAndDelete(req.params.id)
       .then(() => res.json('Item deleted.'))
       .catch(err => res.status(400).json('Error: ' + err));
 });
