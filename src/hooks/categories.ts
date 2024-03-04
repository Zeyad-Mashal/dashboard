import axios from "axios";
import { Category } from "../types";
import useSWRInfinite from "swr/infinite";

const fetchCategory = async (url: string) => {
    const res = await axios.get<Category[]>(url);
    return res.data;
}

type GetKey = (pageIndex: number, previousPageData: Category[][]) => string | null

export const useProduct = (getKey: GetKey) => useSWRInfinite(getKey, fetchCategory);
