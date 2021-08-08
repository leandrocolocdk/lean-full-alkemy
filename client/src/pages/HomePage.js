// import './Home.css';
import { useEffect, useState } from "react"
import Operations2 from '../components/Operations/Operations'
import axiosInstance from '../services/axios';

const Home = () => {
    // const [listOfOperations, setListOfOperations] = useState([]);
    const [lastTen, setLastTen] = useState([]);
    const [sum, setSum] = useState(0);
    // const [error, setError] = useState('');

    useEffect(() => {

        function getUltimateOperations() {
            try {
                axiosInstance.get("http://localhost:3001/api/v1/operations/ten")
                    .then(response => {
                        setLastTen(response.data)
                        console.log(response.data)
                    })
                    .catch((error) => {
                        console.log(error)
                    })
            } catch (error) {
                console.log(error)
                // setError(error)
            }
        }


        getUltimateOperations()
    }, []);

    axiosInstance.get("http://localhost:3001/api/v1/operations")
        .then(response => {
            // setListOfOperations(response.data)

            let sum = 0
            for (const key in response.data) {
                if (response.data[key].type === "entry") {
                    sum += +response.data[key].amount
                    // console.log(+response.data[key].amount)
                } else {
                    sum = sum - response.data[key].amount
                }
            }
            setSum(sum)
        })
        .catch((error) => {
            // setError(error)
            console.log(error)
        })

    return (
        <div className="Home">
            <h2 >Welcome , your balance is {sum}</h2>
            <Operations2 items={lastTen} />
        </div>
    );
}

export default Home;