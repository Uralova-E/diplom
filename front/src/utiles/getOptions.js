import axios from 'axios'
import { baseURL } from '../variables'

export const getOptions = (url, setOptions, key, text, value) => {
    axios.get(`${baseURL}${url}`).then(
        response => {
            response.data.map((item) => {
                setOptions((options) => [...options, {
                    key: item[key],
                    text: item[text], 
                    value: item[value]
                }])
            })
        })
} 