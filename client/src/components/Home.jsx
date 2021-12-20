import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext"
import { UserContext } from "../contexts/UserContext"

export const Home = () => {
    const { isAuthenticated } = useContext(AuthContext);
    const { user } = useContext(UserContext);
    console.log(user);
    return (
        <div className="text-center">
            <h1>Home Page</h1>
            { isAuthenticated && user && <p>Welcome {user.email}</p> }
        </div>
    )
}