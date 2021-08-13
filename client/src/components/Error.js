import Card from "../UI/Card"



const Error = ({ message, bgColor }) => {
    let styles = {
        padding: "1rem",
        marginBottom: "1rem",
        textAlign: "center",
        color: "#fff",
        fontWeight: "bold",
        backgroundColor: bgColor,
    };


    return (
        <div style={styles}>
            <Card className="operations">
                <h2  > {message}</h2 >
            </Card >
        </div >
    )
}
export default Error;