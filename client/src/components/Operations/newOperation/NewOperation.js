// import React, { useState } from 'react';
import OperationForm from '../newOperation/OperationForm';
import OperationFormEdit from '../newOperation/OperationFormEdit';
import './NewOperation.css';

const NewOperation = (props) => {

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

                    operationCreate={props.operationCreate}
                />
            )
            }
        </div>
    );
};

export default NewOperation;