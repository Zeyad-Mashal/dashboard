import React, { useState, useCallback } from "react";
import axios, { AxiosRequestHeaders, AxiosResponse } from "axios";

type UsePutConfig = {
    url: string,
    headers: AxiosRequestHeaders
}

const usePut = <T>(config: UsePutConfig) => {
    const { url, headers } = config;
    const [result, setResult] = useState<{ data?: T, isLoading: boolean }>({ isLoading: false });
    const [payload, setPayload] = useState<Partial<T>>();
    const callAPI = useCallback(async (data: Partial<T>) => {
        let result: { data?: T, error?: any } = {}
        setPayload(data);
        setResult(prevState => ({ ...prevState, isLoading: true }));
        try {
            const res = await axios.put<T>(url, data, { headers });
            setResult({ data: res.data, isLoading: false });
            result = { data: res.data, error: undefined };
        } catch (error:any) {
            console.log(error.response.data)
            setResult({ isLoading: false });
            result = { data: undefined, error: error?.response.data }
        }
        return result;
    }, [url, headers, payload])
    return [result, callAPI] as const;
}

export default usePut;



