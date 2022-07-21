import axios from "axios";

export const api = axios.create({
    baseURL: "http://localhost:3001/v1",
    // auth: {
    //     username: 'admin',
    //     password: 'supersecret'
    // }
});
