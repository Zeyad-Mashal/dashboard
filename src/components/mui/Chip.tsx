import React from 'react';

type PropsChips = {
    color?: string,
    bgColor?:string,
    label: string | undefined,
    
}
export default ({color, bgColor, label}: PropsChips) => (
    <small
        style={{
            backgroundColor: bgColor || "rgba(200,200,200,1)",
            color: color || "white",
            borderRadius: "2em",
            padding: "2px 8px",
            fontSize: ".7em"
        }}
    >{label}</small>
)
