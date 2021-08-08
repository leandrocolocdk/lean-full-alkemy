import React, { useState } from 'react';
import OperationForm from '../newOperation/OperationForm';
import './NewOperation.css';

const NewOperation = (props) => {
    const [isEditing, setIsEditing] = useState(true);


    const saveOperationDataHandler = (enteredOperationData) => {
        props.onAddOperation(enteredOperationData.data);

        // setIsEditing(false);//cerrar el formulario al agregar ops
    };

    // console.log("id desde new Op:", props.editOperation)
    // console.log("id desde new Op:", props.editOperation.amount)
    // console.log("id desde new Op:", props.editOperation.type)

    // const startEditingHandler = () => {
    //     setIsEditing(true);
    // };

    // const stopEditingHandler = () => {
    //     setIsEditing(false);
    // };

    return (
        <div className='new-operation'>
            {/* {!isEditing && (
                <button onClick={startEditingHandler}>Add New Operation</button>
            )} */}
            {/* {isEditing && ( */}
            <OperationForm
                onSaveOperationData={saveOperationDataHandler}
                // onCancel={stopEditingHandler}

                editOperation={props.editOperation}

            />
            {/* )} */}
        </div>
    );
};

export default NewOperation;