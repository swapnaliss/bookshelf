import React, { useState, useCallback, useEffect } from 'react';
import { Card, Dropdown } from 'react-bootstrap';

const BookCard = ({ book, updateBooksStatus }) => {
    // console.log('book', book);
    return (
      <>
        <Card style={{ width: '18rem' }}>
          <Card.Img variant="top" src={book.imageURL} />
          <Card.Body>
            <Card.Title>{book.title}</Card.Title>
            <Card.Text>{book.author}</Card.Text>
            <Card.Text>{book.status}</Card.Text>
  
            <Dropdown>
              <Dropdown.Toggle variant="success" id="dropdown-basic">
                Status
              </Dropdown.Toggle>
  
              <Dropdown.Menu>
                <Dropdown.Item onClick={() => updateBooksStatus(book.id, 'IS_READING')}>
                  Currently Reading
                </Dropdown.Item>
                <Dropdown.Item onClick={() => updateBooksStatus(book.id, 'WANT_TO_READ')}>
                  Want to Read
                </Dropdown.Item>
                <Dropdown.Item onClick={() => updateBooksStatus(book.id, 'READ')}>
                  Read
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Card.Body>
        </Card>
      </>
    );
  };
  

export default BookCard;
