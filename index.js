require('dotenv').config();
const mongoose = require('mongoose');

const app = require('./app');

mongoose
    .connect(process.env.DB.replace('<password>', process.env.DB_PASS))
    .then(() => console.log('Connected to the database.'));

const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Server running on port ${port}.`);
});
