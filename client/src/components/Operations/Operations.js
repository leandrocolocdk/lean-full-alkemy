import { useState, useEffect } from 'react'
// import "../components/Operations/Operations.css"
import Card from "../../UI/Card"
import OperationsList from './OperationsList';
import OperationsFilter from '../Operations/OperationsFilter';
import axiosInstance from '../../services/axios';


const Operations = (props) => {
    const [category, setCategory] = useState([])
    // const [filteredCategory, setFilteredCategory] = useState('')

    useEffect(() => {
        getCategoryData()
    }, []);

    const getCategoryData = async () => {
        try {
            const data = await axiosInstance.get("http://localhost:3001/api/v1/categories")
            // console.log(data)
            setCategory(data.data)
        } catch (error) {
            console.log(error)
        }
    }

    // const filterChangeHandler = (selectedCategory) => [
    //     setFilteredCategory(selectedCategory)
    // ]

    // filtra el array, segun lo seleccionado
    // const filteredOperations = props.items.filter(operation => {
    //     return operation.category === filteredCategory
    // })

    // const onItemRemove = (e) => {
    //     props.onItemRemove(e)
    // }
    return (
        <div>
            <Card className="operations">
                <OperationsFilter
                    // selected={filteredCategory}
                    // onChangeFilter={filterChangeHandler}
                    categories={props.categories}

                />
                {/* onEditHandler={onEditItemHandler}  */}
                <OperationsList
                    items={props.items}
                    onItemEdit={props.onItemEdit}
                    onItemRemove={props.onItemRemove}
                />
            </Card>
        </div>
    )
}
export default Operations;