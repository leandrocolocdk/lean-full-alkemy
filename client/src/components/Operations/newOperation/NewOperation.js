// import React, { useState } from 'react';
import OperationFormEdit from './OperationForm';
import './NewOperation.css';

const NewOperation = (props) => {

    return (
        <div className='new-operation'>
            <OperationFormEdit
                operationEdit={props.operationEdit}//objeto
                setOperationEdit={props.setOperationEdit}//funcion
                updated={props.updated}//editado

                operationCreate={props.operationCreate}
            />
        </div>
    );
};

export default NewOperation;