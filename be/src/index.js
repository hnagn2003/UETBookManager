const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const app = express();
const cors = require('cors');
const route = require('./routes');


app.use(cors());
app.use(express.json());

const PORT = 5001;

try {
    mongoose.connect(process.env.MONGODB_URL);
    // mongoose.connect('mongodb+srv://Cluster0:tt18062003@cluster0.av3ytgl.mongodb.net/UETBookManager?retryWrites=true');
    console.log('Connected to MongoDB');
} catch (err) {
    console.log(err);
}

route(app);

app.listen(PORT, () => {
    console.log(`App listening at http://localhost:${PORT}`);
})