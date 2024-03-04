import React from 'react'
import { styled } from '@mui/material/styles';
import TextField from '@mui/material/TextField';


const InputRounded = styled(TextField)({
    '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderRadius: '2.5em',
    },
}});


export default InputRounded;
