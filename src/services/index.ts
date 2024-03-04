import axios from "axios";
import config from "../utils/config";

import authHeader from "../utils/auth-header";

export const fetchCategory = async function () {
    const response = await axios.get(config.ADMIN_API + `/categories`, {
        headers: authHeader(),
    });

    return response.data;
}

export const isToggleCheck = (data: any, URL: string, axiosConfig): Promise<any> => {

    return axios
        .patch(config.ADMIN_API + URL, JSON.stringify(data), axiosConfig)
        .then((response) => {
            return response.data;
        });
};

