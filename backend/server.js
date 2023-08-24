// require('dotenv').config()
const axios = require('axios');
const cron = require('node-cron');

const dotenv = require('dotenv');
const cors = require('cors');
const express = require('express')
const mongoose = require('mongoose')

const peepRoutes = require('./routes/peeps')
const userRoutes = require('./routes/user')

dotenv.config({ path: `.env.${process.env.NODE_ENV}` });

const app = express()
const port = process.env.PORT || 4000;

//middleware
app.use(express.json())
app.use(cors());
app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
    //'next' is to move to the next piece of middleware
})

// Connect to the database
const dbConnection = async () => {
   
    console.log(`Connecting to database at: ${process.env.MONGO_URI}`);
    try {
        await mongoose.connect(process.env.MONGO_URI);
       
        console.log(`Connected to database at: ${process.env.MONGO_URI}`);
    }
    catch (e) {
        console.log(`Failed to connect: ${e.message}`);
    }
}


//routes
app.use('/api/peeps', peepRoutes)
app.use('/api/user', userRoutes)

// Call the function to connect to the database
dbConnection();

// Function to ping the server ----------------
function pingServer() {
    axios.get('https://chitter-e3j5.onrender.com/api/peeps')
        .then(response => {
            console.log('Successfully pinged server!');
        })
        .catch(error => {
            console.error('Error pinging server:', error);
        });
}

// Schedule the ping task for every 14 minutes
cron.schedule('*/14 * * * *', pingServer);
//---------------------------------------------

const server = app.listen(port, () => {
    const SERVERHOST = server.address().address;
    const SERVERPORT = server.address().port;

    console.log(`App is listening at: http://${SERVERHOST}:${SERVERPORT}`);
});

module.exports = server;


