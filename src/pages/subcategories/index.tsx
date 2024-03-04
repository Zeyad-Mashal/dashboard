import React, { useEffect, useState } from "react"
import PageTableData from "../../components/containers/PageTableData"
import { CategoryList } from "../../components/categories/CategoryList"
import { ICategory } from "../../types"
import config from "../../utils/config"
import authHeader from "../../utils/auth-header"
import axios, { AxiosRequestConfig } from "axios"
import Dialog from "@mui/material/Dialog"
import DialogTitle from "@mui/material/DialogTitle"
import DialogContent from "@mui/material/DialogContent"
import DialogActions from "@mui/material/DialogActions"
import Button from "@mui/material/Button"
import TextField from "@mui/material/TextField"
import Grid from "@mui/material/Grid"
import Stack from "@mui/material/Stack"
import RestartAltIcon from "@mui/icons-material/RestartAlt"
import SaveAltIcon from "@mui/icons-material/SaveAlt"
import { useAppSelector } from "../../store/store"
import { useForm, SubmitHandler, Controller } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as Yup from "yup"
import Alert from "@mui/material/Alert"
import SubmitBtn from "../../components/forms/SubmitBtn"
import ResetBtn from "../../components/forms/ResetBtn"
import { categories } from "../../__mocks__/categories"

import PageTableData from "../../components/containers/PageTableData"
import { subcategories } from "../../__mocks__/subcategories"
import { SubcategoryList } from "../../components/subcategories/SubcategoryList"
import SelectInput from "../../components/forms/SelectInput"

const validationSchema = Yup.object().shape({
    name: Yup.string().required("Category name is required"),
})

const Subcategories = () => {
    const { accessToken } = useAppSelector((state) => state.auth)
    const [categories, setCategories] = useState<ICategory[]>([])
    const [loading, setLoading] = useState<boolean>(false)
    const [status, setStatus] = useState(undefined)
    const [open, setOpen] = useState(false)
    const [formData, setFormData] = useState({ name: "" })
    const [categoryId, setCategoryId] = useState("")

    const {
        register,
        reset,
        control,
        handleSubmit,
        formState: { errors },
    } = useForm<ICategory>({
        resolver: yupResolver(validationSchema),
    })

    useEffect(() => {
        fetchCategories()
    }, [])

    const handleCategoryIdChange = (e: any) => {
        setCategoryId(e.target.value)
    }
    const fetchCategories = async () => {
        setLoading(true)
        try {
            const requestConfig: AxiosRequestConfig = { headers: authHeader() }
            const res = await axios.get(config.ADMIN_API + "/categories", requestConfig)
            setCategories(res.data)
            setLoading(false)
        } catch (error: any) {
            console.log(error)
        }
    }

    const onChange = (e: any) => {
        const { value, id } = e.target
        setFormData({ ...formData, [id]: value })
    }

    function handleClickOpen() {
        setOpen(true)
    }

    function handleClickClose() {
        setOpen(false)
    }

    const bearerToken = accessToken ? JSON.parse(accessToken) : ""
    const axiosConfig: AxiosRequestConfig = {
        headers: {
            //@ts-ignore
            Authorization: "Bearer " + bearerToken,
            "Content-Type": "application/json",
        },
    }
    const onFormSubmit = async (data: any) => {
        try {
            const res = await axios.post(config.ADMIN_API + "/categories", data, axiosConfig)

            if (res.status === 201) {
                handleClickClose()
                fetchCategories()
            }
        } catch (error: any) {
            console.log(error.response)
            if (error.response.status === 409) {
                //@ts-ignore
                setStatus({ type: "error", msg: error.response.data.error })
                setOpen(true)
            }
        }
    }
    //Category Form Component
    const SubCategoryForm = ({ open, handleClickClose, onceSubmitted, error }: any) => {
        const {
            register,
            handleSubmit,
            formState: { errors },
        } = useForm({
            resolver: yupResolver(validationSchema),
        })

        const onSubmit = (data: any) => {
            onceSubmitted(data)
        }

        return (
            <Dialog
                open={open}
                onClose={handleClickClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">Create new subcategory</DialogTitle>
                {error && <Alert severity="error">{error}</Alert>}

                <DialogContent>
                    <Grid container sx={{ mt: 2 }}>
                        <Grid item xs={12}>
                            <form onSubmit={handleSubmit(onSubmit)}>
                                <TextField
                                    fullWidth
                                    label="Name"
                                    type="text"
                                    variant="filled"
                                    size="small"
                                    name="name"
                                    {...register("name")}
                                    error={errors.name ? true : false}
                                    helperText={errors.name?.message}
                                />
                                <SelectInput
                                    value={categoryId}
                                    onChange={handleCategoryIdChange}
                                    items={categories}
                                    label="Select category"
                                    getValue={(item: any) => item.id}
                                    getTitle={(item: any) => item.name}
                                />
                                <div
                                    style={{
                                        display: "flex",
                                        justifyContent: "space-around",
                                        alignItems: "center",
                                    }}
                                >
                                    <DialogActions>
                                        <ResetBtn onClick={() => {}} />
                                        <SubmitBtn
                                            title="Save"
                                            onClick={() => console.log("hello")}
                                        />
                                    </DialogActions>
                                </div>
                            </form>
                        </Grid>
                    </Grid>
                </DialogContent>
            </Dialog>
        )
    }

    return (
        <PageTableData btnTitle="New Subcategory" onClick={handleClickOpen}>
            <SubcategoryList subcategories={subcategories} />
            <SubCategoryForm
                open={open}
                handleClickClose={handleClickClose}
                onceSubmitted={(data: any) => onFormSubmit(data)}
                error={status?.msg}
            />
        </PageTableData>
    )
}

export default Subcategories
