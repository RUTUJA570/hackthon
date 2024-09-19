const connectToMongo = require('./database');
const express = require('express')
var cors = require('cors') 

connectToMongo();
const app = express()
const port = 5000

app.use(cors())
app.use(express.json())

// Available Routes
app.use('/api/auth', require('./routes/auth'))
app.use('/api/orders', require('./routes/orders'))


app.listen(port, () => {
  console.log(`server listening at http://localhost:${port}`)
})