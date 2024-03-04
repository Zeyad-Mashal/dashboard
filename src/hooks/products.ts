import axios from "axios";
import { Product } from "../types";
import useSWRInfinite from "swr/infinite";

const fetchProduct = async (url: string) => {
    const res = await axios.get<Product[]>(url);
    return res.data;
}

type GetKey = (pageIndex: number, previousPageData: Product[][]) => string | null

export const useProduct = (getKey: GetKey) => useSWRInfinite(getKey, fetchProduct);
