//https://economia.awesomeapi.com.br/json/all/USD-BRL

import axios from "axios";

const api = axios.create({
    baseURL: 'https://economia.awesomeapi.com.br/json/'
})

export default api