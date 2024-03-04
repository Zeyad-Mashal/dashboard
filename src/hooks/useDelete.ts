import axios, { AxiosRequestHeaders } from "axios";

const useDelete = <T>(headers: AxiosRequestHeaders) => {
    return async (url: string) => {
        let result: { data?: T, error?: unknown } = {}
        try {
            const res = await axios.delete<T>(url, { headers });
            result = { data: res.data, error: undefined }

        } catch (err) {
            result = { data: undefined, error: err }
        }

        return result;
    }

}

export default useDelete;
