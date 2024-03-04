import React from 'react';
import {styled} from '@mui/material/styles';
import BaseInput from '@mui/material/InputBase';
import Paper from '@mui/material/Paper'
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/SearchOutlined';

const Input = styled(BaseInput)(({theme}) => `
    height: 36.5px;
    text-transform: none;
    margin-left:12px;
    flex:1;
    font-size: 14px;
    :focus {
        botder-color: ${theme.palette.primary.main}
    }
`)

const CustomPaper = styled(Paper)(({theme}) => `
    height: 36.5px;
    display: flex;
    
    border-radius:.5em;
    :hover {
        border-color: ${theme.palette.primary.main}
    }
    :active {
        border-color: ${theme.palette.primary.main}
    }
`)

const SearchFiled = (props:any) => {
    return (
        <CustomPaper
            variant='outlined'
        >
            <Input {...props} placeholder={props.placeholder || 'Search...'}/>
            <IconButton type='submit' sx={{height: "36.5px", width: "36.5px"}}><SearchIcon /></IconButton>

        </CustomPaper>
    )
}

export default SearchFiled;
