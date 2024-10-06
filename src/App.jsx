import { useState, useEffect } from 'react'
import './App.css'

function App() {

  const [dataFetched, setDataFetched] = useState([]);

  useEffect(() => {
    fetch('/data.json')
      .then((response) => response.json())
      .then((jsonData) => setDataFetched(jsonData))
      .catch((error) => console.error('Error fetching JSON:', error));
  }, []);

  function handleSortByDate() {
    const sortedData = [...dataFetched].sort((a, b) => new Date(b.date) - new Date(a.date));
    setDataFetched(sortedData);
  }

  function handleSortByViews() {
    const sortedData = [...dataFetched].sort((a, b) => {
      if (a.views === b.views) {
        // If views are the same, sort by date (latest first)
        return new Date(b.date) - new Date(a.date);
      }
      return b.views - a.views;
    });
    setDataFetched(sortedData);
  }

  return (
    <>
      <h1>Data and Views Table</h1>
      <div>
        <div>
          <button onClick={handleSortByDate}>Sort by Date</button>
          <button onClick={handleSortByViews}>Sort by Views</button>
        </div>
        <div>
          <table>
            <thead>
              <tr>
                <th>Date</th>
                <th>Views</th>
                <th>Articles</th>
              </tr>
            </thead>
            <tbody>
              {dataFetched && dataFetched.map((dataItem) => (
                <tr key={`${dataItem.article}-${dataItem.date}`}>
                  <td>{dataItem.date}</td>
                  <td>{dataItem.views}</td>
                  <td>{dataItem.article}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  )
}

export default App
