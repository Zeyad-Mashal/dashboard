import axios, { AxiosRequestHeaders } from "axios";

const usePatch = <T>(headers: AxiosRequestHeaders) => {
    return async (url: string, data:Partial<T> = {}) => {
        let result: { data?: T, error?: unknown } = {}
        try {
            const res = await axios.patch<T>(url, data, { headers });
            result = { data: res.data, error: undefined }

        } catch (err) {
            result = { data: undefined, error: err }
        }

        return result;
    }

}

export default usePatch;
