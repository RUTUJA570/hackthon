const mongoose = require('mongoose');


const db = async () =>{
   await mongoose.connect('mongodb://localhost:27017/hackthon')
.then(() => console.log('Connected!'));
}
module.exports = db;