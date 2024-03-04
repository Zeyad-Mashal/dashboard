import { v4 as uuid } from "uuid"

export const orderStatuses = [
    { id: 1, name: "Pending", code: "PENDING" },
    { id: 2, name: "Received", code: "RECEIVED" },
    { id: 3, name: "Cancelled", code: "CANCELLED" },
]
export const orders = [
    {
        id: "fe9ecfa2-97c6-4b71-80c3-7b4012dd9a64",
        avatarUrl: "/static/images/avatars/avatar_3.png",
        name: "Ekaterina Tankova",
        createdAt: 1555016400000,
        number: "12332",
        paid: "Yes",
        status: "Recieved",
    },
    {
        id: "430fda4b-0758-4c53-968f-204f96310791",
        avatarUrl: "/static/images/avatars/avatar_3.png",
        createdAt: 1555016400000,
        name: "Ekaterina Lk",
        paid: "No",
        number: "12332",
        status: "Pending",
    },
   
]
