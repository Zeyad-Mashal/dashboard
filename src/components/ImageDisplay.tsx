import React, { useState } from 'react'
import { Box, Stack } from '@mui/material';


const ImageDisplay = (props: { images: string[] }) => {
    const { images } = props;
    const [currImg, setCurrImg] = useState(images[0]);

    return (
        <>
            <Box sx={{ width: "100%" }}>
                <Box sx={{ mb: 2 }}>
                    <img src={currImg} style={{ width: "100%", borderRadius: ".5em" }} />
                </Box>
                <Stack direction="row" spacing={2} sx={{ overflowX: "auto" }}>
                    {images.map(img => (
                        <img src={img} style={{
                            width: "60px",
                            height: "60px",
                            cursor: "pointer",
                            borderRadius: ".5em",
                            ...(img !== currImg && { opacity: 0.5 })
                        }} onClick={() => setCurrImg(img)} />
                    ))}
                </Stack>
            </Box>
        </>
    )
}

export default ImageDisplay