import { v4 as uuid } from "uuid"

export const products = [
    {
        id: uuid(),
        createdAt: 1555016400000,
        name: "Gift Pack 1",
        description:"Loremipsum",
        type:"Gift",
        price: "200",
        stock:"100",
        discountAmount:"130",
        discountPerc:"5%",
        Trending:"true",
        TopRated:"No"

    },
    {
        id: uuid(),
        createdAt: 1555016400000,
        name: "Gift Pack 2",
        description:"Loremipsum",
        type:"Gift",
        price: "200",
        stock:"2",
        discountAmount:"130",
        discountPerc:"5%",
        Trending:"true",
        TopRated:"No"
    },
    {
        id: uuid(),
        createdAt: 1555016400000,
        name: " Gift Pack 3",
        description:"Loremipsum",
        type:"Gift",
        price: "200",
        stock:"100",
        discountAmount:"130",
        discountPerc:"5%",
        Trending:"true",
        TopRated:"No"
    },
]
