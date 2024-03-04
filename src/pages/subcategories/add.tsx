import React, { useState } from "react"
import { categories } from "../../__mocks__/categories"
import TextInput from "../../components/forms/TextInput"
import SelectInput from "../../components/forms/SelectInput"
import Content from "../../components/containers/PageViewContainer"
import { Button, Box, FormControl, Select, MenuItem, InputLabel } from "@mui/material"
import SubmitBtn from "../../components/forms/SubmitBtn"

export default function CategoryAdd() {
    const [name, setName] = useState("")
    const [categoryId, setCategoryId] = useState("")
    const [nameError, setNameError] = useState("")
    const [categoryError, setCategoryError] = useState("")

    const handleSubmit = () => {
        let hasError: boolean = false
        setNameError("")
        setCategoryError("")

        if (!name) {
            hasError = true
            setNameError("Name is required")
        }
        if (!categoryId) {
            hasError = true
            setCategoryError("Category is required!")
        }
        if (hasError) {
            return
        }

        const parentCategory = categories.find((item) => item.id === categoryId)
        console.log("sub category name to submit", name, "parent category:", parentCategory)
    }
    const handleSubCategoryNameChange = (e: any) => {
        setName(e.target.value)
        setNameError("")
    }
    const handleCategoryIdChange = (e: any) => {
        setCategoryId(e.target.value)
        setCategoryError("")
    }
    return (
        <Content title="Create Sub Category">
            <form>
                <TextInput
                    error={!!nameError}
                    helperText={nameError}
                    label="Sub Category Name"
                    required
                    onChange={handleSubCategoryNameChange}
                    value={name}
                />
                <SelectInput
                    value={categoryId}
                    errorText={categoryError}
                    onChange={handleCategoryIdChange}
                    items={categories}
                    label="Select category"
                    getValue={(item: any) => item.id}
                    getTitle={(item: any) => item.name}
                />
                <SubmitBtn title="Create" onClick={handleSubmit} />
            </form>
        </Content>
    )
}
