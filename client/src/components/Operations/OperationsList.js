import OperationItem from './OperationItem';
// import '../components/OperationsList.css';
// import '@/components/OperationsList.css';

const OperationsList = (props) => {

    // const onItemRemove = (e) => {
    //     props.onItemRemove(e)
    // }

    return (
        <div className='operations-list'>
            {props.items.length > 0 ?
                props.items.map((operation) => (
                    <OperationItem
                        key={operation.id}
                        id={operation.id}
                        concept={operation.concept}
                        amount={operation.amount}
                        date={operation.date}
                        type={operation.type}
                        category={operation.category}

                        onItemEdit={props.onItemEdit}
                        onItemRemove={props.onItemRemove}
                    />
                )) :
                <strong className="operations-list__fallback">No hay operaciones</strong>}
        </div>
    );
};

export default OperationsList;