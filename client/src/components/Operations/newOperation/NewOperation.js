import React, { useState } from 'react';
import OperationForm from '../newOperation/OperationForm';
import OperationFormEdit from '../newOperation/OperationFormEdit';
import './NewOperation.css';

const NewOperation = (props) => {
    const [isEditing, setIsEditing] = useState(true);


    const saveOperationDataHandler = (enteredOperationData) => {
        console.log("enteredData", enteredOperationData)
        props.onAddOperation(enteredOperationData);

        setIsEditing(false);//cerrar el formulario al agregar ops
    };

    const onSaveEditOperationData = (editedOperationData) => {
        //     props.onEditOperation(editedOperationData.data);

        setIsEditing(false);//cerrar el formulario al agregar ops
    };

    const startEditingHandler = () => {
        setIsEditing(true);
    };

    const stopEditingHandler = () => {
        setIsEditing(false);
    };

    return (
        <div className='new-operation'>
            {props.operationEdit.id ? (

                <OperationFormEdit
                    operationEdit={props.operationEdit}//objeto
                    setOperationEdit={props.setOperationEdit}//funcion
                    updated={props.updated}//editado

                />
            ) : (
                <OperationForm
                    onCreateOperationData={saveOperationDataHandler}

                    onClick={stopEditingHandler}
                />
            )
            }
        </div>
    );
};

export default NewOperation;