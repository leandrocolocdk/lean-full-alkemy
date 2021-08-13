import './Home.css';
import { useEffect, useState } from "react"
import Operations from '../components/Operations/Operations'
import OperationForm from '../components/Operations/newOperation/OperationForm'
import axiosInstance from '../services/axios';
import Loader from '../components/Loader'
import Error from '../components/Error'

const initialOperation = {
  "id": "", "concept": "", "date": "", "amount": "", "type": "", "category": ""
}
const ListOperationPage = (props) => {
  const [operationEdit, setOperationEdit] = useState(initialOperation)

  const [listOfOperations, setListOfOperations] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState('');


  let operationCreate = async (operation) => {
    // console.log(operation)
    await axiosInstance.post("http://localhost:3001/api/v1/operations", operation)
      .then(response => {
        // llamar a toast
        setListOfOperations(prevOperations => {
          return [response.data.data, ...prevOperations]
        })
      })
      .catch(error => {
        console.log(error)
      })
  }

  const updated = async (operation) => {
    await axiosInstance.put(`http://localhost:3001/api/v1/operations/${operation.id}`, operation)
      .then(() => {
        const arrayEdit = listOfOperations.map(item => (
          item.id === operation.id ? operation : item
        ))

        setListOfOperations(arrayEdit)
      })
      .catch(error => {
        console.log(error)
        setError(error)
      })
  }

  const onItemRemove = (id) => {
    console.log(id)
    try {
      const arrayFiltered = listOfOperations.filter(item => item.id !== id)
      setListOfOperations(arrayFiltered)
      deleteOperationsData(id)
    } catch (error) {
      console.log(error)
      setError(error)
    }
  }

  function deleteOperationsData(id) {
    try {
      axiosInstance.delete(`http://localhost:3001/api/v1/operations/${id}`,)
        .then(response => {
          console.log(response.data)
        })
        .catch((error) => {
          console.log(error)
        })
    } catch (error) {
      setError(error)
      console.log(error)
    }
  }


  useEffect(() => {
    getOperationsData()
  }, []);

  function getOperationsData() {
    try {
      setLoading(true)
      axiosInstance.get("http://localhost:3001/api/v1/operations/")
        .then(response => {
          setListOfOperations(response.data)
          setLoading(false)
        })
        .catch((error) => {
          console.log(error)
          setError(error)
          setLoading(false)
        })
    } catch (error) {
      setError(error)
      console.log(error)
      setLoading(false)
    }

  }


  return (

    <div className="ListOperationPage">
      {loading && <Loader />}
      {error && <Error message={`${error} `} bgColor="#dc3545" />}
      <OperationForm
        operationCreate={operationCreate}

        operationEdit={operationEdit}//objeto a editar
        setOperationEdit={setOperationEdit}//funcion
        updated={updated}//objeto editado
      />


      <Operations
        items={listOfOperations}

        // onItemEdit={onItemEdit}// llega el item completo
        setOperationEdit={setOperationEdit}
        onItemRemove={onItemRemove}
      // onEditOperation={saveEditOperationDataHandler}//con formulario editado
      />
    </div>
  );
}

export default ListOperationPage;