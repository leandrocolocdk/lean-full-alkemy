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
            <div>
                <div className="operation-item__action">
                    <button onClick={() => {
                        props.setOperationEdit({
                            id: props.id,
                            concept: props.concept,
                            amount: props.amount,
                            date: props.date,
                            type: props.type,
                            category: props.category
                        })
                    }}//debe legar al formulario
                    > Edit</button>

                </div>
                <div className="operation-item__action">
                    <button onClick={() => props.onItemRemove(props.id)} >Delete</button>

                </div>
            </div>


        </Card>
    );
}

export default OperationItem;