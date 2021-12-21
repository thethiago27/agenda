import axios from "axios"
import {session} from "./session";

export const api = axios.create({
    baseURL: "http://localhost:8750",
    headers: {
        Authorization: `Bearer ${session.getToken()}`
    }
})