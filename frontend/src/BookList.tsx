import { useEffect, useState } from 'react';
import { Book } from './types/Book';

function BookList() {
  const [books, setBooks] = useState<Book[]>([]);
  const [pageSize, setPageSize] = useState<number>(10);
  const [pageNum, setPageNum] = useState<number>(1);
  const [totalItems, setTotalItems] = useState<number>(0);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc' | null>(null); // No sorting by default

  // Getting the info from the API
  useEffect(() => {
    const fetchBooks = async () => {
      const response = await fetch(
        `https://localhost:5000/Book/AllBooks?pageSize=${pageSize}&pageNum=${pageNum}`
      );
      const data = await response.json();
      setBooks(data.books);
      setTotalItems(data.totalNumBooks);
      setTotalPages(Math.ceil(totalItems / pageSize));
    };

    fetchBooks();
  }, [pageSize, pageNum, totalItems]);

  // Sorting logic (applies only when sortOrder is set)
  const sortedBooks = sortOrder
    ? [...books].sort((a, b) =>
        sortOrder === 'asc'
          ? a.title.localeCompare(b.title)
          : b.title.localeCompare(a.title)
      )
    : books; // No sorting by default

  return (
    <>
      <h1>Books</h1>
      <br />

      {/* Sorting Button (doesn't sort by default) */}
      <button
        onClick={() => {
          if (sortOrder === null) {
            setSortOrder('asc'); // Start sorting in ascending order
          } else if (sortOrder === 'asc') {
            setSortOrder('desc'); // Switch to descending order
          } else {
            setSortOrder(null); // Reset to default (no sorting)
          }
        }}
      >
        {sortOrder === null
          ? 'Sort by Title (Ascending)' // Default state
          : sortOrder === 'asc'
            ? 'Sort by Title (Descending)' // After first click
            : 'Reset'}{' '}
        {/* After second click */}
      </button>

      {/* Printing all of the cards */}
      {sortedBooks.map((b) => (
        <div id="bookCard" className="card" key={b.bookId}>
          <h3 className="card-title">{b.title}</h3>
          <div className="card-body">
            <ul className="list-unstyled">
              <li>
                <strong>Author: </strong>
                {b.author}
              </li>
              <li>
                <strong>Publisher: </strong>
                {b.publisher}
              </li>
              <li>
                <strong>ISBN: </strong>
                {b.isbn}
              </li>
              <li>
                <strong>Classification: </strong>
                {b.classification}
              </li>
              <li>
                <strong>Category: </strong>
                {b.category}
              </li>
              <li>
                <strong>PageCount: </strong>
                {b.pageCount}
              </li>
              <li>
                <strong>Price: </strong>${b.price.toFixed(2)}
              </li>
            </ul>
          </div>
        </div>
      ))}

      {/* Page buttons */}
      <button disabled={pageNum === 1} onClick={() => setPageNum(pageNum - 1)}>
        Previous
      </button>

      {[...Array(totalPages)].map((_, i) => (
        <button
          key={i + 1}
          onClick={() => setPageNum(i + 1)}
          disabled={pageNum === i + 1}
        >
          {i + 1}
        </button>
      ))}

      <button
        disabled={pageNum === totalPages}
        onClick={() => setPageNum(pageNum + 1)}
      >
        Next
      </button>

      <br />
      {/* Results buttons */}
      <label>
        Results per page:
        <select
          value={pageSize}
          onChange={(p) => {
            setPageSize(Number(p.target.value));
            setPageNum(1);
          }}
        >
          <option value="5">5</option>
          <option value="10">10</option>
          <option value="20">20</option>
        </select>
      </label>
    </>
  );
}

export default BookList;
