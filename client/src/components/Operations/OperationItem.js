import "../Operations/OperationItem.css";
import Card from '../../UI/Card.js'
import OperationDate from "./OperationDate";

const OperationItem = (props) => {

    return (
        <Card className="operation-item">

            <OperationDate date={props.date} />
            <div className="operation-item__description">
                <h2>{props.concept}</h2>
                <h4>{props.category}</h4>
                <div className="operation-item__price" >{props.type === "egress" ? '-' : ''} ${props.amount}
                </div>
            </div>
            <div className="operation-item__action">
                <button onClick={() => props.onItemEdit(props.id,
                    props.concept,
                    props.amount,
                    props.date,
                    props.type,
                    props.category,
                )}> Edit</button>
                <button onClick={() => props.onItemRemove(props.id)} >Delete</button>
            </div>

        </Card>
    );
}

export default OperationItem;