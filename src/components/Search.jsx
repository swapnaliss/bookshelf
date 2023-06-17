import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import BookCard from './BookCard';

const Search = () => {
    const [query, setQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [books, setBooks] = useState([]);

    // Fetch books from '/books.json' using useEffect and set them in the 'books' state variable
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

    const handleSearchChange = (e) => {
        setQuery(e.target.value);
    };

    useEffect(() => {
        const filteredBooks = books.filter((book) =>
            book.title.toLowerCase().includes(query.toLowerCase())
        );
        console.log('filteredBooks', filteredBooks);
        setSearchResults(filteredBooks);
    }, [query, books]);


    const addBookToLibrary = (id) => {
        const bookToAdd = books.find((book) => book.id === id);
        if (bookToAdd) {
            setBooks((prevBooks) => [...prevBooks, bookToAdd]);
        }
    };

    return (
        <div className="container">
            <h1>Bookshelf - Search</h1>
            <Link to="/">Home</Link>

            <div>
                <input
                    type="text"
                    placeholder="Search books"
                    value={query}
                    onChange={handleSearchChange}
                />
            </div>

            <div>
                <h2>Search Results</h2>
                <div className="card-deck">
                    {searchResults.map((book) => (
                        <BookCard
                            key={book.id}
                            book={book}
                            updateBooksStatus={addBookToLibrary}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Search;
