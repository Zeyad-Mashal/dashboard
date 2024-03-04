import React from 'react';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Button from '@mui/material/IconButton';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import {useNavigate} from 'react-router-dom';

type PropsPagebar = {
    title?: string,
    children?: JSX.Element | JSX.Element[],
    backBtn?: boolean
}
export default (props: PropsPagebar) => {
    const {title, backBtn, children} = props;
    const navigate = useNavigate();

    return (
        <>
            <Box sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                px: 3,
                py: 2,
                overflowX: "auto",
                overflowY: "hidden",
                position: 'sticky'
            }}>
                {(title || backBtn) && <Stack
                    direction='row'
                    spacing={2}
                    sx={{display: 'flex', alignItems: 'center'}}
                >
                    {backBtn && <Button
                        onClick={() => navigate(-1)}
                    ><ArrowBackIcon /></Button>}
                    {title && <Typography variant="h6">{title}</Typography>}
                </Stack>}
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    minWidth: '1024px',
                    flex:1,
                }}>
                    {children}
                </div>
            </Box>
            <Divider />
        </>
    )
};
