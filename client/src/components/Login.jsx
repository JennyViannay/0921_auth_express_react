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
                    console.log(data);
                    if (data.error) setError(data.error);
                    else {
                        localStorage.setItem("token", data.token);
                        localStorage.setItem("user", JSON.stringify(data.user));
                        window.location.href = "/";
                    }
                })
        } else {
            setError("Please enter email and password");
        }
    }

    return (
        <div className="container bg-primary text-white">
            <div className="row text-center p-5">
                <h2 className="text-center mb-5">Login</h2>
                <form className="col-lg-6 col-md-6 col-xs-12 mx-auto" onSubmit={handleSubmit}>
                    {error && <p className="alert alert-danger">{error}</p>}
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">Email</label>
                        <input type="text" className="form-control" name="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">Password</label>
                        <input type="password" className="form-control" name="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                    </div>
                    <button type="submit" className="btn btn-warning">Login</button>
                </form>
            </div>
        </div>
    )
}