import React from "react";
import { Box, FilledTextFieldProps, IconButton, TextField as Input, Tooltip } from "@mui/material"
import InfoIcon from '@mui/icons-material/Info';
import Zoom from '@mui/material/Zoom';

interface TextFieldProps extends FilledTextFieldProps {
    showInfoBtn?: boolean,
    infoMessage?: string,
}

const TextField = (props: TextFieldProps) => {
    const {showInfoBtn, name, infoMessage} = props;
    return (
        <Box sx={{ position: 'relative'}}>
            <Input {...props} name={name} sx={{position:'relative'}}/>
            {showInfoBtn &&
                <Tooltip  title={infoMessage || ''} TransitionComponent={Zoom} arrow>
                    <IconButton size='small' sx={{ position: 'absolute', right: 5, top:props.helperText ? '34%' : '50%', transform:'translateY(-50%)' }}><InfoIcon /></IconButton>
                </Tooltip>
            }
        </Box>
    )
}

export default TextField;
