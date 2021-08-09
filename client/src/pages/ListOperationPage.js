import './Home.css';
import { useEffect, useState } from "react"
import Operations from '../components/Operations/Operations'
import NewOperation from '../components/Operations/newOperation/NewOperation';
import axiosInstance from '../services/axios';


const ListOperationPage = () => {
  const [operationEdit, setOperationEdit] = useState({
    "id": "", "concept": "", "date": "", "amount": "", "type": "", "category": ""
  })

  const addOperationHandler = (operation) => {
    setListOfOperations(prevOperations => {
      return [operation, ...prevOperations]
      // hace la magia! recibe de new Operation
    })
  }

  const saveEditOperationDataHandler = (operation) => {
    console.log(operation)
    const arrayEdit = listOfOperations.map(item => (
      item.id === operation.id ? { id: item.id, concept: item.concept, date: item.date, amount: item.amount, type: item.type, category: item.category } : item
    ))
    setListOfOperations(arrayEdit)
  }

  function onItemEdit(id, concept, amount, date, type, category) {
    // console.log({ id, concept, date, amount, category })
    let opEdit = { id, concept, amount, date, type, category }
    setOperationEdit(opEdit)
    // console.log("opEd Home", operationEdit)
  }

  const onItemRemove = (id) => {
    console.log(id)
    try {
      const arrayFiltered = listOfOperations.filter(item => item.id !== id)
      setListOfOperations(arrayFiltered)
      deleteOperationsData(id)
    } catch (error) {
      console.log(error)
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
      // setError(error)
      console.log(error)
    }
  }

  const [listOfOperations, setListOfOperations] = useState([]);
  // const [error, setError] = useState('');

  useEffect(() => {
    getOperationsData()
  }, []);

  function getOperationsData() {
    try {
      axiosInstance.get("http://localhost:3001/api/v1/operations/")
        .then(response => {
          setListOfOperations(response.data)
        })
        .catch((error) => {
          console.log(error)
        })
    } catch (error) {
      // setError(error)
      console.log(error)
    }
  }


  return (
    // si hay id es edit, entonces activar componenteeditar.
    <div className="ListOperationPage">
      <NewOperation
        onAddOperation={addOperationHandler}
        editOperation={operationEdit}
      />


      <Operations
        items={listOfOperations}
        // categories={category}
        onItemEdit={onItemEdit}
        onItemRemove={onItemRemove}
        onEditOperation={saveEditOperationDataHandler}
      />
    </div>
  );
}

export default ListOperationPage;