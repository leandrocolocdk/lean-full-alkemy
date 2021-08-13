// import './Home.css';
import { useEffect, useState } from "react"
import Operations from '../components/Operations/Operations'
import axiosInstance from '../services/axios';
import Error from '../components/Error'
import Loader from '../components/Loader'

const Home = () => {
    const [lastTen, setLastTen] = useState([]);
    const [sum, setSum] = useState(0);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState('');

    useEffect(() => {
        setLoading(true)
        function getUltimateOperations() {
            try {
                axiosInstance.get("http://localhost:3001/api/v1/operations/ten")
                    .then(response => {
                        setLastTen(response.data)
                        // console.log(response.data)
                    })
                    .catch((error) => {
                        console.log(error)
                    })
            } catch (error) {
                console.log(error)
                setError(error)
            }
        }
        getUltimateOperations()
        setLoading(false)
    }, []);

    axiosInstance.get("http://localhost:3001/api/v1/operations")
        .then(response => {
            let sum = 0
            for (const key in response.data) {
                if (response.data[key].type === "entry") {
                    sum += +response.data[key].amount
                    // console.log(+response.data[key].amount)
                } else {
                    sum = sum - response.data[key].amount
                }
            }
            setSum(sum.toFixed(2))
        })
        .catch((error) => {
            // setError(error)
            console.log(error)
        })

    return (
        <div className="Home">
            {loading && <Loader />}
            {error && <Error />}
            <h2 >Welcome , your balance is {sum}</h2>
            <Operations items={lastTen} />
        </div>
    );
}

export default Home;