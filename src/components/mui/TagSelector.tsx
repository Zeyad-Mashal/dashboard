import * as React from 'react';
import { Theme, useTheme } from '@mui/material/styles';
import FilledInput from '@mui/material/FilledInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { Typography } from '@mui/material';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};


function getStyles(name: string, tagName: readonly string[], theme: Theme) {
    return {
        fontWeight:
            tagName.indexOf(name) === -1
                ? theme.typography.fontWeightRegular
                : theme.typography.fontWeightMedium,
    };
}


type PropsTagSelector = {
    tags: string[],
    selected?: string[]
    name?: string,
    helperText?: string,
    error?: boolean,
    color?:boolean
    onChange: (v: any) => void  
}
export default function TagSelector(props: PropsTagSelector) {
    const { tags, selected, name, helperText, error, color } = props;
    const theme = useTheme();
    const [tagName, setTagName] = React.useState<string[]>([]);
    const [backgroundColor, setBackgroundColor] = React.useState([])

    const handleChange = (event: SelectChangeEvent<typeof tagName>) => {
        const {
            target: { value },
        } = event;
        setTagName(
            // On autofill we get a stringified value.
            typeof value === 'string' ? value.split(',') : value,
        );

        //@ts-ignore
        setBackgroundColor(value)
    };


    let col = ""
    backgroundColor.map((color) => {
        col = color
    })
    function backgroundColorSelect() {
        return (
            <div style={{ backgroundColor: col, height: "50px", width: "50px",marginLeft:"2px" }}></div>

        )
    }

    return (
        <>
            <div style={{display:"flex", flexDirection:"row"}}>
                <FormControl fullWidth size='small' variant='filled'>
                    <InputLabel id="demo-multiple-chip-label">{name}</InputLabel>
                    <Select
                        labelId="demo-multiple-chip-label"
                        id="demo-multiple-chip"
                        multiple
                        variant='filled'
                        name={name}
                        error={error}
                        value={tagName}
                        defaultValue={selected}
                       // onChange={handleChange}
                        onChange={(value) => props.onChange(selected)}
                        input={<FilledInput id="select-multiple-chip" />}
                        MenuProps={MenuProps}
                    >
                        {tags.map((tag) => (
                            <MenuItem
                                key={tag}
                                value={tag}
                                style={getStyles(tag, tagName, theme)}
                            >
                                {tag}
                            </MenuItem>
                        ))}
                    </Select>
                    <Typography color='error' sx={{ ml: 2 }}><small>{helperText}</small></Typography>
                </FormControl>
                { color && backgroundColorSelect()}
            </div>
           

        </>
    );
}

