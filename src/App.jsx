import { useQuery } from "@tanstack/react-query";

const BASE_URL = "https://library-api.uidotdev.workers.dev";

async function getData() {
  const url = `${BASE_URL}/books/pD6arNyKyi8C`;
  const response = await fetch(url);

  // If an error is thrown then isError is set to true
  if (!response.ok) {
    throw new Error("Something went wrong");
  }

  const data = response.json();
  return data;
}

function useBook() {
  return useQuery({
    queryKey: ["bookData"],
    queryFn: getData,
  });
}

function Book() {
  const { data, isLoading, isError } = useBook();

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
  return (
    <div>
      <header className="app-header">
        <h1>
          <span>Query Library</span>
        </h1>
      </header>
      <Book />
    </div>
  );
}
