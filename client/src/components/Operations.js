import "../components/Operations.css"
import Card from "../UI/Card"
import OperationsList from '../components/OperationsList';

const Operations = (props) => {

    return (
        <div>
            <Card className="operations">

                <OperationsList items={props.items} />
            </Card>
        </div>
    )
}
export default Operations;