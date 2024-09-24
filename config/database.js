const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://patelrudra:R12345@cluster0.fivna.mongodb.net/', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log('MongoDB connected'))
    .catch((err) => console.log(err));

module.exports = mongoose;
