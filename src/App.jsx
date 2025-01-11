/* eslint-disable react/prop-types */
import { useQuery } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { useState } from "react";
import Checkout from "./Components/Checkout";

const BASE_URL = "https://library-api.uidotdev.workers.dev";

async function getData(bookId) {
  const url = `${BASE_URL}/books/${bookId}`;
  const response = await fetch(url);

  // If an error is thrown then isError is set to true
  if (!response.ok) {
    throw new Error("Something went wrong");
  }

  const data = response.json();
  return data;
}

function useBook(bookId) {
  return useQuery({
    queryKey: ["bookData", bookId],
    queryFn: () => getData(bookId),
    staleTime: 5000,
  });
}

function Book({ bookId }) {
  const { data, isLoading, isError, refetch, isStale, isFetching } =
    useBook(bookId);

  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    return <Error />;
  }

  return (
    <main className="book-detail">
      <div>
        <span className="book-cover">
          <img src={data.thumbnail} alt={data.title} />
        </span>
      </div>
      <div>
        <h2 className="book-title">{data.title}</h2>
        <small className="book-author">{data.authors.join(", ")}</small>
      </div>
      <Checkout info={{ refetch, isStale, isFetching }} />
    </main>
  );
}

function Loading() {
  return <main>Loading...</main>;
}

function Error() {
  return <main>Woops there was an error...</main>;
}

export default function App() {
  const [selectedBookId, setSelectedBookId] = useState("pD6arNyKyi8C");

  return (
    <>
      <div>
        <header className="app-header">
          <h1>
            <span>Query Library</span>
          </h1>
          <div className="select">
            <select
              value={selectedBookId}
              onChange={(e) => setSelectedBookId(e.target.value)}
            >
              <option value="pD6arNyKyi8C">The Hobbit</option>
              <option value="aWZzLPhY4o0C">The Fellowship Of The Ring</option>
              <option value="12e8PJ2T7sQC">The Two Towers</option>
              <option value="WZ0f_yUgc0UC">The Return Of The King</option>
            </select>
          </div>
        </header>
        <Book bookId={selectedBookId} />
      </div>
      <ReactQueryDevtools initialIsOpen={false} />
    </>
  );
}
