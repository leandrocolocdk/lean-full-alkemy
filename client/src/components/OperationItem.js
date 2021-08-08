import "../components/OperationItem.css";
import Card from '../UI/Card.js'
import OperationDate from "../components/OperationDate";

const OperationItem = (props) => {

    return (
        <Card className="operation-item">
            <OperationDate date={props.date} />
            <div className="operation-item__description">
                <h2>{props.concept}</h2>
                <div className="operation-item__price">{props.type} ${props.amount}</div>
            </div>
        </Card>

    );
}

export default OperationItem;