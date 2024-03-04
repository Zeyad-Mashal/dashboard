export interface ICustomer {
    id?: number,
    name: string,
    primary_phone: string,
    email: string,
    phone: string,
    created_at?: string,
    updated_at?: string
}

export type User = {
    id: string
    name: string,
    username: string,
    password?: string,
    email: string,
    phone: string,
    created_at?: string,
    updated_at?: string
}



export interface ICategory {
    id?: string,
    name: string
}

export type Product = {
    id: string
    name: string
    type: 'Gift' | 'Rental' | 'Purchase'
    description: string
    size: string
    price: number
    seasonalPrice: number
    discountAmount: number
    discountPercent: number
    barcode?: string
    vat?: string
    vatAmount?: number
    colors: string[]
    isTrending: boolean
    isAvailable: boolean
    isOrderable: boolean
    stock: number
    isTopRated: boolean
    isDisplay: boolean
    pictures: string[]
    categories:string[]
    createdAt: Date
    updatedAt: Date
}

export type Package = {
    id: string
    name: string
    type: 'Gift' | 'Rental' | 'Purchase'
    description: string
    size: string
    price: number
    seasonalPrice?: number
    discountAmount: number
    discountPercent: number
    barcode?: string
    vat?: string
    vatAmount?: number
    isTrending: boolean
    isAvailable: boolean
    isOrderable: boolean
    stock: number
    countDownTimes: {
        start: string;
        end: string;
    }
    isTopRated: boolean
    isDisplay: boolean
    pictures: string[]
    items: string[]
    createdAt: Date
    updatedAt: Date
}

export type Category = {
    id: string,
    name: string,
    metaTitle:string,
    metaDescription:string,
    metaKeywords:string,
    discountPercent:number,
    isDiscountEnabled:boolean
}

export type Blog = {
    id:string,
    title:string,
    content:string,
    description:string,
    bannerImg:string
}

export type Customer = {
    id:string,
    firstName:string,
    lastName:string,
    displayName:string,
    loginType:string,
    phone?:string,
    email:string,
    picture:string,
    createdAt?:string,
    updatedAt?:string,
    addresses:string[],
    orders: string[]
}

export type Coupon = {
    id: string,
    name: string,
    code: string,
    discountAmount: number,
    maxUsage: number,
    usedCount: number,
    isBlocked:boolean,
    startDateTime: Date
    expDateTime: Date
}

export type DeliveryAgent = {
    id: string
    firstName: string,
    lastName: string,
    email: string,
    displayName:string,
    isBlocked:boolean,
    created_at?: string,
    updated_at?: string
}

export type NewsLetter = {
    id:string,
    email:string,
    isSubscribed:true,
    createdAt:Date,
    updatedAt:Date
}

