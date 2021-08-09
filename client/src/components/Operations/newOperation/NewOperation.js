import React, { useState } from 'react';
import OperationForm from '../newOperation/OperationForm';
import OperationFormEdit from '../newOperation/OperationFormEdit';
import './NewOperation.css';

const NewOperation = (props) => {
    const [isEditing, setIsEditing] = useState(true);


    const saveOperationDataHandler = (enteredOperationData) => {
        props.onAddOperation(enteredOperationData.data);

        // setIsEditing(false);//cerrar el formulario al agregar ops
    };

    // const onSaveEditOperationData = (editedOperationData) => {
    //     props.onEditOperation(editedOperationData.data);

    // setIsEditing(false);//cerrar el formulario al agregar ops
    // };

    // const startEditingHandler = () => {
    //     setIsEditing(true);
    // };

    const stopEditingHandler = () => {
        setIsEditing(false);
    };

    return (
        <div className='new-operation'>

            {props.editOperation.id ? (
                <OperationFormEdit
                    onSaveEditOperationData={props.onEditOperationDataHnadler}
                    editOperation={props.editOperation}
                    onClick={stopEditingHandler}
                />
            ) : (
                <OperationForm
                    onSaveOperationData={saveOperationDataHandler}
                    onClick={stopEditingHandler}
                />
            )}

        </div>
    );
};

export default NewOperation;