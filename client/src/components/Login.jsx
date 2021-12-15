import { useState } from "react";
import axios from "axios";

const url = "http://localhost:8000/security/login";
export const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        if (email && password) {
            const user = { email: email, password: password };
            axios.post(url, user)
                .then(({ data }) => {
                    if (data.error) setError(data.error);
                    else {
                        console.log(data, "User is successfully logged in");
                        setError("");
                        setEmail("");
                        setPassword("");
                    }
                })
        }
    }

    return (
        <div className="row">
            <h2 className="text-center">Login</h2>
            <form className="col-md-4 col-md-offset-4" onSubmit={handleSubmit}>
                {error && <p className="text-danger">{error}</p>}
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input type="text" name="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input type="password" name="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>
                <button type="submit">Register</button>
            </form>
        </div>
    )
}