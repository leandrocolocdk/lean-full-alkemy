import React, { useState } from 'react';
import OperationForm from '../newOperation/OperationForm';
import './NewOperation.css';

const NewOperation = (props) => {
    const [isEditing, setIsEditing] = useState(false);

    const saveOperationDataHandler = (enteredOperationData) => {
        const operationData = {
            ...enteredOperationData,
            // id: Math.random().toString(),
        };
        props.onAddOperation(operationData);
        console.log(operationData)
        setIsEditing(false);
    };

    const startEditingHandler = () => {
        setIsEditing(true);
    };

    const stopEditingHandler = () => {
        setIsEditing(false);
    };

    return (
        <div className='new-operation'>
            {!isEditing && (
                <button onClick={startEditingHandler}>Add New Operation</button>
            )}
            {isEditing && (
                <OperationForm
                    onSaveOperationData={saveOperationDataHandler}
                    onCancel={stopEditingHandler}
                />
            )}
        </div>
    );
};

export default NewOperation;