import * as React from 'react';
import {styled, alpha} from '@mui/material/styles';
import ButtonDropDown from './mui/ButtonDropDown';
import Menu, {MenuProps} from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import {useTheme} from '@mui/material';
import Checkbox from '@mui/material/Checkbox';
import ListItemText from '@mui/material/ListItemText';


const StyledMenu = styled((props: MenuProps) => (
    <Menu
        elevation={0}
        anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
        }}
        transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
        }}
        {...props}
    />
))(({theme}) => ({
    '& .MuiPaper-root': {
        borderRadius: 6,
        marginTop: theme.spacing(1),
        minWidth: 180,
        maxHeight: 48 * 6,
        overflowY: "auto",
        color:
            theme.palette.mode === 'light' ? 'rgb(55, 65, 81)' : theme.palette.grey[300],
        boxShadow:
            'rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
        '& .MuiMenu-list': {
            padding: '4px 0',
        },
    },
}));

type PropsDropDown<T> = {
    values: T[],
    onClick: (v: T[]) => void,
    renderValue: (v: T) => string,
    label: string
}

export default function DropDownCheckBox<T>(props: PropsDropDown<T>) {
    const {values, onClick, renderValue, label} = props;
    const theme = useTheme();
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const [selectedValues, setSelectedValues] = React.useState<T[]>([]);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = (v: T) => {
        if(v === undefined) {
            setSelectedValues([]);
            setAnchorEl(null);
            onClick([]);
            return
        }  

        if (selectedValues.some(sv => sv == v)) {
            const vs = selectedValues.filter((sv) => sv !== v);
            setSelectedValues(vs);
            onClick(vs);
        } else {
            setSelectedValues([v, ...selectedValues]);
            onClick([...selectedValues, v]);
        }
        setAnchorEl(null);
    };

    return (
        <div>
            <ButtonDropDown
                id="dropdown-button"
                aria-controls={open ? 'dropdown-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                variant="outlined"
                disableElevation
                onClick={handleClick}
                endIcon={<KeyboardArrowDownIcon />}
            >
                <b>{label.toUpperCase()}</b>
            </ButtonDropDown>
            <StyledMenu
                id="dropdown-menu"
                MenuListProps={{
                    'aria-labelledby': 'dropdown-button',
                }}
                anchorEl={anchorEl}
                open={open}
                // @ts-ignore
                onClose={() => setAnchorEl(null)}
            >
                <MenuItem 
                    // @ts-ignore
                    onClick={() => handleClose(undefined)} 
                    disableRipple
                    sx={{fontSize:"12px"}}
                >
                    RESET
                </MenuItem>
                {values.map((v, idx) => (
                    <MenuItem sx={{fontSize:"12px"}} key={idx} onClick={() => handleClose(v)} disableRipple>
                        <Checkbox size='small' checked={selectedValues.indexOf(v) > -1}/>
                        {renderValue(v).toUpperCase()}
                    </MenuItem>
                ))}
            </StyledMenu>
        </div>
    );
}


