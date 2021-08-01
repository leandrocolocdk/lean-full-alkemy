import "../components/OperationDate.css"

const OperationDate = (props) => {
    const date = new Date(props.date)

    const day = date.toLocaleString('es-AR', { day: '2-digit' })
    const month = date.toLocaleString('es-AR', { month: 'long' })
    const year = date.getFullYear()
    return (
        <div className="operation-date">
            <div className="operation-date__day">{day}</div>
            <div className="operation-date__month">{month}</div>
            <div className="operation-date__year">{year}</div>
        </div>
    )
}
export default OperationDate;