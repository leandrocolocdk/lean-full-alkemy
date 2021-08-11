import { useState, useEffect } from 'react'
import './OperationForm.css'

const initailForm = {
    id: null,
    concept: "",
    date: "",
    amount: "",
    type: "",
    category: "",
};
const OperationFormEdit = (props) => {
    const [form, setForm] = useState(props.operationEdit);

    console.log(props.operationEdit)
    // const [enteredConcept, setEnteredConcept] = useState(props.operationEdit.concept || '')
    // const [enteredDate, setEnteredDate] = useState(new Date(props.operationEdit.date).toISOString().split('T')[0] || '')
    // const [enteredDate, setEnteredDate] = useState('')
    // const [enteredAmount, setEnteredAmount] = useState(props.operationEdit.amount || '')
    // const [enteredType, setEnteredType] = useState(props.operationEdit.type || '')
    // const [enteredCategory, setEnteredCategory] = useState(props.operationEdit.category || '')

    const handleChange = (event) => {
        const { name, value } = event.target
        setForm({
            ...form,
            [name]: value,
            // [e.target.date]: e.target.value,
            // [e.target.amount]: e.target.value,
            // [e.target.type]: e.target.value,
            // [e.target.category]: e.target.value,
            // [name.date]: value.toISOString().split('T')[0],
        });
        console.log(name.date)
        console.log(event.target.value)
    };

    useEffect(() => {
        //   if (props.operationEdit) {
        setForm(props.operationEdit);
        //   } else {
        //       setForm(initailForm);
        //   }
    }, [props.operationEdit]);



    const submitHandler = (event) => {
        event.preventDefault();
        // if (!enteredConcept
        //     || !enteredDate
        //     || !enteredAmount
        //     || !enteredType

        // ) return

        props.updated(form)
        handleReset()


    }
    const handleReset = (e) => {
        setForm(initailForm);
        props.operationEdit.id = null
    };

    return (
        <form onSubmit={submitHandler}>
            <div className='new-operation__controls'>
                <div className="new-operation__control">
                    <label>Concept</label>
                    <input type="text" value={form.concept} name="concept"
                        onChange={handleChange} />
                </div>

                <div className="new-operation__control">
                    <label>Amount</label>
                    <input type="number" min="0.01" step="0.01" value={form.amount} onChange={handleChange} name="amount" />
                </div>
                <div className="new-operation__control">
                    <label>Date</label>
                    <input type="date"
                        value={form.date} onChange={handleChange} name="date" />
                </div>
                <div className="new-operation__control">
                    <label>Category</label>
                    <input type="text" value={form.category} name="category"
                        onChange={handleChange} />
                </div>
                <div className="new-operation__radio" >
                    <label>Type (Disabled)</label>
                    <input disabled type="radio" value="egress" checked={form.type === 'egress'} onChange={handleChange} />Egress
                    <input disabled type="radio" value="entry" checked={form.type === 'entry'} onChange={handleChange} />Entry
                </div>

            </div>
            <div className="new-operation__actions">
                <button type="submit">Edit Operation</button>
                <button onClick={handleReset}>Cancel</button>
            </div>
        </form>
    )
}
export default OperationFormEdit