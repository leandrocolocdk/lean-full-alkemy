
// import React, { useState, useEffect } from 'react';
// import axiosInstance from '../services/axios';
import './OperationsFilter.css';

const OperationsFilter = (props) => {

    const categoryChangeHandler = (event) => {
        props.onChangeFilter(event.target.value)
    }

    return (
        <div>
            <div className='operations-filter'>
                <div className='operations-filter__control'>
                    <label>Category</label>
                    {/* <input
                        type="text"
                        onChange={categoryChangeHandler} >
                        {props.categories.map(item => (
                            <option key={item.id} value={item.name}>{item.name}</option>
                        ))}
                    </input> */}

                </div>

            </div>

        </div>


    );
};

export default OperationsFilter;