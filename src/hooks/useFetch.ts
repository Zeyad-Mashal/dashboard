import React, { useState, useEffect } from "react";
import axios, { AxiosRequestHeaders } from "axios";


const useFetch = <T>(url: string, headers: AxiosRequestHeaders) => {
    const [data, setData] = useState<T>();
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<unknown>();

    const refetch = (u:string) => {url = u }

    useEffect(() => {
        axios.get(url, { headers }).then(res => {
            setData(res.data);
            setIsLoading(false);

        }).catch(err => {
            setError(err);
            setIsLoading(false);
        })
    }, [url])

    return { data, isLoading, error, refetch }
}

export default useFetch;
