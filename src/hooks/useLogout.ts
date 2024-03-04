import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"
import config from "../utils/config";

const useLogout = () => {
    const navigate = useNavigate();

    const logoutUser = async (): Promise<{ data: any, error: Error | undefined }> => {
        try {
            await axios.get(config.ADMIN_API + "/auth/logout")
            // Remove token here
            navigate("/", { replace: true });
            return { data: undefined, error: undefined };

        } catch (err) {
            return { data: undefined, error: err as Error };
        }
    }

    return logoutUser;
}

export default useLogout;
