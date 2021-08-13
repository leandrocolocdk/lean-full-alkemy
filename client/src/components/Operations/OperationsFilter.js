
import './OperationsFilter.css';

const OperationsFilter = (props) => {

    const categoryChangeHandler = (event) => {
        props.onChangeFilter(event.target.value)
    }

    return (
        <div>
            <div className='operations-filter'>
                <div className='operations-filter__control'>
                    <label>Filter by Category</label>
                    <input
                        type="text"
                        onChange={categoryChangeHandler}
                    >
                    </input>
                </div>
            </div>
        </div>
    );
};

export default OperationsFilter;