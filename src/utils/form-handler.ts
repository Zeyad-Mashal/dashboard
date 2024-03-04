import React from 'react';

export type FieldError = {
    [key: string]: any
}

export type FieldValue = {
    [key: string]: any
}

export function handleSubmit<T extends FieldValue>(handleFunc: (values: T) => void) {
    const handler = (e: React.BaseSyntheticEvent) => {
        e.preventDefault()
        const values = Object.fromEntries((new FormData(e.target as HTMLFormElement)).entries());
        // @ts-ignore
        handleFunc(values)
    }

    return handler
}

