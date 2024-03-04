import axios, { AxiosRequestConfig } from "axios";
import React, { useRef, useState } from "react"
import { useAppSelector } from "../../store/store";
import config from "../../utils/config";
import TableMoreMenu from "../containers/TableMoreMenu"
import SuccessModal from "../SuccessModal";
// ----------------------------------------------------------------------

type propType = {
    id: string
}

function UserMoreMenu(props: propType) {
    const { accessToken } = useAppSelector((state) => state.auth);
    const [open, setOpen] = useState(false);
    const [status, setStatus] = useState(undefined);
    const editLink = `/user-edit/${props.user.id}`

    const axiosConfig: AxiosRequestConfig = {
        headers: {
            //@ts-ignore
            "Authorization": 'Bearer ' + JSON.parse(accessToken),
            "Content-Type": "application/json",
        },
    };

    const handleDelete = async () => {

        try {

            const res = await axios.delete(config.ADMIN_API + `/users/${props.user.id}`, axiosConfig);
            console.log(res)
            if (res.status === 204) {
                //@ts-ignore
                setStatus({ type: "success", msg: "category deleted successfully" });
                setOpen(true);
            }
            // props.fetchCategories()
        } catch (error: any) {
            console.log(error.response);
        }
    }

    function handleClose() {
        setOpen(false);
    }

    return (
        <>
            <SuccessModal
                open={open}
                handleClose={handleClose}
                message={status?.msg}
            />
            <TableMoreMenu editLink={editLink} handleDelete={handleDelete} id={props.user.id} />
        </>

    )
}

export default UserMoreMenu
