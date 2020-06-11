import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { config } from '../config';


const useFetchData = (url, method) => {
    const abortController = new AbortController();
    const [response, setResponse] = useState();
    const authData = useSelector((state) => state.authReducer.authData);
    console.log(authData);

    useEffect(() => {
        const fetchData = async (url, method, token) => {
            try {

                const response = await fetch(`${config.apiURL}/${url}`, {
                    method: method,
                    headers: {
                        'Authorization': 'Bearer ' + token,
                        'Content-Type': 'application/json'

                    },
                });
                const data = await response.json();
                console.log(data);
                if (!response.ok) {
                    throw new Error('unauthorized')
                }

                setResponse(data)

            } catch (e) {
                console.log(e)
            }
        }
        fetchData(url, method, authData.value ? authData.value.token : authData.token);
        return () => {
            abortController.abort();
        };
    }, [authData, method, url])
    return response;
}


export default useFetchData;