import { useState, useEffect } from 'react'
import './OperationForm.css'

const initialForm = {
    id: null,
    concept: "",
    date: "",
    amount: "",
    type: "",
    category: "",
};
const OperationFormEdit = (props) => {
    const [form, setForm] = useState(props.operationEdit);

    const handleChange = (event) => {
        const { name, value } = event.target

        setForm({
            ...form,
            [name]: value
        });

    };

    useEffect(() => {
        if (props.operationEdit) {

            let dateFormat = (props.operationEdit.date).split('T')[0]
            setForm({
                id: props.operationEdit.id,
                concept: props.operationEdit.concept,
                date: dateFormat,
                amount: props.operationEdit.amount,
                type: props.operationEdit.type,
                category: props.operationEdit.category
            });

        } else {
            setForm(initialForm);
        }
    }, [props.operationEdit]);

    const submitHandler = (event) => {
        event.preventDefault();
        if (!form.concept || !form.category || !form.type
            || !form.amount || !form.date) {
            alert("Fill in all the fields")
            return
        }

        props.updated(form)
        handleReset()
    }

    const handleReset = () => {
        setForm(initialForm);
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
                    <input disabled type="radio" name="egress"
                        value="egress" checked={form.type === 'egress'} onChange={handleChange} />Egress
                    <input disabled type="radio" name="entry"
                        value="entry" checked={form.type === 'entry'} onChange={handleChange} />Entry
                </div>

            </div>
            <div className="new-operation__actions">
                <button type="submit">Edit Operation</button>
                <button type="reset" onClick={handleReset}>Cancel</button>
            </div>
        </form>
    )
}
export default OperationFormEdit