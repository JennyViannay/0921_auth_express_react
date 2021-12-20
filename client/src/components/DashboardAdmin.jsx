import axios from "axios"
import { useEffect } from "react"

export const DashboardAdmin = () => {
    useEffect(() => {
        axios.get("http://localhost:8000/admin", {
            headers: { "x-access-token": localStorage.getItem("token") }
        })
        .then(({ data }) => {console.log(data)})
    })
    return (
        <div className="text-center">
            <h1>Welcome Admin</h1>
        </div>
    )
}