const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const app = express();
const cors = require('cors');
const route = require('./routes');
const router = express.Router()

app.use(cors());
app.use(express.json());

const PORT = 5001;

try {
    mongoose.connect(process.env.MONGODB_URL, {useUnifiedTopology: true,
        useNewUrlParser: true, });
    console.log('Connected to MongoDB');
} catch (err) {
    console.log(err);
}

route(app);


app.listen(PORT, () => {
    console.log(`App listening at http://localhost:${PORT}`);
})