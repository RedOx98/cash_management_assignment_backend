const express = require("express");
const mongoose = require("mongoose");
const dotenv = require('dotenv');
dotenv.config();

const app = express();

mongoose.connect(process.env.MONGO_URL);

const connection = mongoose.connection;
connection.on('open', error => {
    if (!error) {
        console.log('DB connection successful');
    } else {
        console.log(`DB connection failed with error: ${error}`);
    }
});

mongoose.set('strictQuery', false);

app.use(express.json());

app.use('/auth', require('./routes/auth'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on PORT ${PORT}`));