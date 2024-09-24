const express = require('express');
const db = require('./config/database');
const Book = require('./models/bookSchema');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
const port = 8081;

// Set view engine to EJS
app.set('view engine', 'ejs');

// Body-parser middleware
app.use(bodyParser.urlencoded({ extended: true }));

// Static folder
app.use(express.static(path.join(__dirname, 'public')));


// INDEX ROUTE (Read all books)
app.get('/', (req, res) => {
  Book.find({}).then((books) => {
    res.render('index', { books });
  }).catch((err) => {
    console.log(err);
    res.status(500).send('Error fetching books');
  });
});

// ADD BOOK FORM
app.get('/add', (req, res) => {
  res.render('addBook');
});

// ADD BOOK (Create a book)
app.post('/add', (req, res) => {
  const { title, price, author, city, pages, description, language } = req.body;
  
  const newBook = new Book({
    title, price, author, city, pages, description, language
  });

  newBook.save()
    .then(() => res.redirect('/'))
    .catch((err) => {
      console.log(err);
      res.status(500).send('Error adding book');
    });
});

// EDIT BOOK FORM (Find book by ID)
app.get('/edit/:id', (req, res) => {
  Book.findById(req.params.id).then((book) => {
    res.render('editBook', { book });
  }).catch((err) => {
    console.log(err);
    res.status(500).send('Error fetching book');
  });
});

// EDIT BOOK (Update a book)
app.post('/edit/:id', (req, res) => {
  const { title, price, author, city, pages, description, language } = req.body;

  Book.findByIdAndUpdate(req.params.id, {
    title, price, author, city, pages, description, language
  }).then(() => {
    res.redirect('/');
  }).catch((err) => {
    console.log(err);
    res.status(500).send('Error updating book');
  });
});

// DELETE BOOK
app.get('/delete/:id', (req, res) => {
  Book.findByIdAndDelete(req.params.id).then(() => {
    res.redirect('/');
  }).catch((err) => {
    console.log(err);
    res.status(500).send('Error deleting book');
  });
});

// VIEW BOOK (Display book details)
app.get('/view/:id', (req, res) => {
  Book.findById(req.params.id).then((book) => {
    res.render('table', { book });
  }).catch((err) => {
    console.log(err);
    res.status(500).send('Error fetching book details');
  });
});

// Start the server
app.listen(port, () => {
  db
  console.log(`Server running on http://localhost:${port}`);
});
