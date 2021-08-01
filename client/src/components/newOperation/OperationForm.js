import { useState } from 'react'
import './OperationForm.css'
import axios from 'axios'

const OperationForm = (props) => {
    const [enteredConcept, setEnteredConcept] = useState('')
    const [enteredDate, setEnteredDate] = useState('')
    const [enteredAmount, setEnteredAmount] = useState('')
    const [enteredType, setEnteredType] = useState('')

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

    const submitHandler = (event) => {
        event.preventDefault();

        const operationData = {
            concept: enteredConcept,
            amount: enteredAmount,
            date: new Date(enteredDate),
            type: enteredType
        }
        // console.log(operationData)
        axios.post("http://localhost:3001/operations", operationData).then(response => {
            console.log(response)
            props.onSaveOperationData(operationData);
        })

        setEnteredConcept('');
        setEnteredDate('');
        setEnteredAmount('');
        setEnteredType('');
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
                    <input type="date" min="2019-01-01" max="2022-12-31" value={enteredDate} onChange={dateChangeHandler} />
                </div>
                <div className="new-operation__radio" >
                    <label>Type</label>
                    <input type="radio" value="egress" checked={enteredType === 'egress'} onChange={typeChangeHandler} />Egress
                    <input type="radio" value="entry" checked={enteredType === 'entry'} onChange={typeChangeHandler} />Entry
                </div>

            </div>
            <div className="new-operation__actions">
                <button type="submit">Add Operation</button>
            </div>
        </form>
    )
}
export default OperationForm