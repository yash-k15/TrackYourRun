require('./models/User')
require('./models/Track')
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/authRoutes');
const trackRoutes = require('./routes/trackRoutes');
const requireAuth = require('./middlewares/requireAuth');

const app = express();

app.use(bodyParser.json());
app.use(authRoutes);
app.use(trackRoutes);

// To connect to Mongo
const mongoUri = 'mongodb+srv://admin:root@cluster0.9ejew.mongodb.net/<dbname>?retryWrites=true&w=majority';

mongoose.connect(mongoUri, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
});

//What happens when connection to Mongo is successfull
mongoose.connection.on('connected', () => {
    console.log('Connected to mongo instance');
}) 

//What happens when connection to Mongo is not successfull
mongoose.connection.on('error', (err) => {
    console.error('Error connecting to mongo', err);
})

app.get('/', requireAuth, (req, res) => {
    res.send(`Your email Id is - ${req.user.email}`);
})

app.listen(3000, () => {
    console.log('Listening on Port 3000');
})