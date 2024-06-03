import { Link } from "react-router-dom";

function Index() {
    console.log("HELLO");
    return (
        <section>
            <p>HOME PAGE</p>
            <Link to={"/profile"}>Profile</Link>
        </section>
    )
}

export default Index
