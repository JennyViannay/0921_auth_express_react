import { useState } from "react";
import axios from "axios";

const url = "http://localhost:8000/security/register";
export const Register = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        if (email && password) {
            const newUser = { email: email, password: password };
            axios.post(url, newUser)
            .then(({data}) => {
                if (data.error) setError(data.error);
                else {
                    console.log(data, "User is successfully registered");
                    setError("");
                    setEmail("");
                    setPassword("");
                } 
            })
        } else setError("All fields are required");
    }
    
    return (
        <div className="row">
            <h2 className="text-center">Register</h2>
            <form className="col-md-4 col-md-offset-4" onSubmit={handleSubmit}>
                {error && <p className="text-danger">{error}</p>}
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input type="text" name="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)}/>
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input type="password" name="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
                </div>
                <button type="submit">Register</button>
            </form>
        </div>
    )
}