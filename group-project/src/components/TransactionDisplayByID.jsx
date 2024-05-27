import { Link, useParams } from "react-router-dom";
export default function TransactionDisplayByID() {
    const params = useParams();
    return (
    <div>
        <Link to="/transactions">Back to All Transactions</Link>
        <p>Transaction No. {params.transactionID}</p>
    </div>
);}