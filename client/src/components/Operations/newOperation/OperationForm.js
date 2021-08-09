import { useState } from 'react'
import './OperationForm.css'
import axiosInstance from '../../../services/axios'

const OperationForm = (props) => {
    const [enteredConcept, setEnteredConcept] = useState('')
    const [enteredDate, setEnteredDate] = useState('')
    const [enteredAmount, setEnteredAmount] = useState('')
    const [enteredType, setEnteredType] = useState('')
    const [enteredCategory, setEnteredCategory] = useState('')

    // console.log("desde form", props.editOperation)

    const conceptChangeHandler = (event) => {
        setEnteredConcept(event.target.value)
    }

    const dateChangeHandler = (event) => {
        setEnteredDate(event.target.value)
    }

    const amountChangeHandler = (event) => {
        setEnteredAmount(event.target.value)
    }
    const typeChangeHandler = (event) => {
        setEnteredType(event.target.value)
    }
    const categoryChangeHandler = (event) => {
        setEnteredCategory(event.target.value)
    }

    const submitHandler = async (event) => {
        event.preventDefault();

        //validar entradas
        if (!enteredConcept
            || !enteredDate
            || !enteredAmount
            || !enteredType

        ) return


        const operationData = {
            concept: enteredConcept,
            amount: enteredAmount,
            date: new Date(enteredDate),
            // type: enteredType,
            category: enteredCategory
        }
        // console.log(operationData)
        await axiosInstance.post("http://localhost:3001/api/v1/operations", operationData)
            .then(response => {
                console.log("response edit", response.message)
                props.onSaveOperationData(response.data);
            })

        setEnteredConcept('');
        setEnteredDate('');
        setEnteredAmount('');
        setEnteredType('');
        setEnteredCategory('');
    }

    return (
        <form onSubmit={submitHandler}>
            <div className='new-operation__controls'>
                <div className="new-operation__control">
                    <label>Concept</label>
                    <input type="text" value={enteredConcept}
                        onChange={conceptChangeHandler} />
                </div>

                <div className="new-operation__control">
                    <label>Amount</label>
                    <input type="number" min="0.01" step="0.01" value={enteredAmount} onChange={amountChangeHandler} />
                </div>
                <div className="new-operation__control">
                    <label>Date</label>
                    <input type="date" value={enteredDate} onChange={dateChangeHandler} />
                </div>
                <div className="new-operation__control">
                    <label>Category</label>
                    <input type="text" value={enteredCategory}
                        onChange={categoryChangeHandler} />
                </div>
                <div className="new-operation__radio" >
                    <label>Type</label>
                    <input type="radio" value="egress" checked={enteredType === 'egress'} onChange={typeChangeHandler} />Egress
                    <input type="radio" value="entry" checked={enteredType === 'entry'} onChange={typeChangeHandler} />Entry
                </div>

            </div>
            <div className="new-operation__actions">
                <button type="submit">Add Operation</button>
                <button onClick={props.onCancel}>Cancel</button>
            </div>
        </form>
    )
}
export default OperationForm