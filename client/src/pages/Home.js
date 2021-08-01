import './Home.css';
import axios from 'axios';
import { useEffect, useState } from "react"
import Operations from '../components/Operations'
import NewOperation from '../components/newOperation/NewOperation';

const Home = () => {
    const [operations, setOperations] = useState([])

    const addOperationHandler = (operation) => {
        setOperations(prevOperations => {
            return [operations, ...prevOperations]
        })
    }

    const [listOfOperations, setListOfOperations] = useState([]);

    useEffect(() => {

        axios.get("http://localhost:3001/operations").then(response => {
            setListOfOperations(response.data)
        })
    }, []);
    return (
        <div className="Home">
            <NewOperation onAddOperation={addOperationHandler} />

            <Operations
                items={listOfOperations}
            />
        </div>
    );
}

export default Home;