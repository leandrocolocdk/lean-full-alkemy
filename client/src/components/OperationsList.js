import OperationItem from '../components/OperationItem';
import '../components/OperationsList.css';

const OperationsList = (props) => {
    return (
        <ul className='operations-list'>
            {props.items.map((operation) => (
                <OperationItem
                    key={operation.id}
                    concept={operation.concept}
                    amount={operation.amount}
                    date={operation.date}
                />
            ))}
        </ul>
    );
};

export default OperationsList;