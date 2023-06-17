import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import BookCard from './BookCard';

const Home = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await fetch('/books.json');
        const data = await response.json();
        setBooks(data);
      } catch (error) {
        console.log('Error fetching book data:', error);
      }
    };

    fetchBooks();
  }, []);

  const updateBookStatus = (id, newStatus) => {
    setBooks((prevBooks) => {
      return prevBooks.map((book) => {
        if (book.id === id) {
          return { ...book, status: newStatus };
        }
        return book;
      });
    });
  };

  return (
    <div className="container">
      <h1>Bookshelf - Home</h1>
      <Link to="/search">Search</Link>

      <div>
        <h2>Currently Reading</h2>
        <div>
          {books
            .filter((book) => book.status === 'IS_READING')
            .map((book) => (
              <BookCard
                key={book.id}
                book={book}
                updateBooksStatus={updateBookStatus}
              />
            ))}
        </div>
      </div>

      <div>
        <h2>Want to Read</h2>
        <div className="card-deck">
          {books
            .filter((book) => book.status === 'WANT_TO_READ')
            .map((book) => (
              <BookCard
                key={book.id}
                book={book}
                updateBooksStatus={updateBookStatus}
              />
            ))}
        </div>
      </div>

      <div>
        <h2>Read</h2>
        <div className="card-deck">
          {books
            .filter((book) => book.status === 'READ')
            .map((book) => (
              <BookCard
                key={book.id}
                book={book}
                updateBooksStatus={updateBookStatus}
              />
            ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
