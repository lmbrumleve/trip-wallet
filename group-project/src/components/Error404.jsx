import { Link } from "react-router-dom";

export default function Error404(){
    return (
        <div>
            <h1>The page you are looking for does not exist</h1>
            <Link to="/">Back to home page</Link>
        </div>
    );
}