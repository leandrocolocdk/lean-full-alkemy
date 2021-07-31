import './Home.css';
import axios from 'axios';
import { useEffect, useState } from "react"
import Operations from '../components/Operations'

const Home = () => {
    const [listOfOperations, setListOfOperations] = useState([]);

    useEffect(() => {

        axios.get("http://localhost:3001/operations").then(response => {
            console.log(response.data);
            setListOfOperations(response.data)
        })
    }, []);
    return (
        <div className="App">
            <Operations
                items={listOfOperations}
            />
        </div>
    );
}

export default Home;