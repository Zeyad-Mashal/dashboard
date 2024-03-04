import React from 'react';
import Box from "@mui/material/Box";

type PropsContent = {
    padding?: boolean,
    children: React.ReactElement | React.ReactElement[] | JSX.Element | JSX.Element[]
}
const Content = ({ padding, children }:PropsContent) => (
    <Box sx={{ 
        px: padding ? 3 : 0, 
        py: padding ? 3 : 0,
    }}
    >{children}</Box>
)

export default Content;
