import './App.css';
import axios from 'axios';
import { useEffect, useState } from "react"

function App() {
  const [listOfOperations, setListOfOperations] = useState([]);

  useEffect(() => {

    axios.get("http://localhost:3001/operations").then(response => {
      console.log(response.data);
      setListOfOperations(response.data)
    })
  }, []);
  return (
    <div className="App">
      {listOfOperations.map((value, key) => {
        return <div>{value.concept}</div>;
      })}
    </div>
  );
}

export default App;
