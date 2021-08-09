
import React, { useState } from 'react';
// import axiosInstance from '../services/axios';
import './OperationsFilter.css';

const OperationsFilter = (props) => {
    const [enteredCategory, setEnteredCategory] = useState('')

    const categoryChangeHandler = (event) => {
        // console.log(event.target.value)
        setEnteredCategory(event.target.value)
        setEnteredCategory(enteredCategory)
        props.onChangeFilter(event.target.value)
    }

    return (
        <div>
            <div className='operations-filter'>
                <div className='operations-filter__control'>
                    <label>Filter by Category</label>
                    <input
                        type="text"
                        value={enteredCategory}
                        onChange={categoryChangeHandler}
                    >
                    </input>

                </div>

            </div>

        </div>


    );
};

export default OperationsFilter;