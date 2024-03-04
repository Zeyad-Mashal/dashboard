import { DeleteOutline } from "@mui/icons-material";
import Edit from "@mui/icons-material/Edit";
import MoreVert from "@mui/icons-material/MoreVert";
import RemoveCircle from "@mui/icons-material/RemoveCircle";
import DiscountIcon from '@mui/icons-material/Discount';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import { IconButton, ListItemIcon, ListItemText, Menu, MenuItem } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import { Category } from "../../types";

type PropsActionMenu = {
    category: Category,
    onAddDiscount: (category: Category) => void,
    onDelete: (category: Category) => void,
    onUpdate: (category: Category) => void,
    onRemove: (category: Category) => void
}

const ActionMenu = (props: PropsActionMenu) => {
    const { category, onAddDiscount, onDelete, onUpdate, onRemove } = props;
    const [open, setOpen] = React.useState(false);
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

    const handleMenuClick = (e: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(e.currentTarget);
        setOpen(true);
    }

    const handleClose = () => {
        setAnchorEl(null);
        setOpen(false);
    }



    return (
        <>
            <IconButton onClick={handleMenuClick}>
                <MoreVert />
            </IconButton>
            <Menu
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                PaperProps={{
                    sx: { width: 200, maxWidth: "100%" },
                }}
            >
                <MenuItem onClick={() => onAddDiscount(category)}>
                    <ListItemIcon>
                        <DiscountIcon color="success" />
                    </ListItemIcon>
                    <ListItemText primary="Add Discount" primaryTypographyProps={{ variant: "body2" }} />
                </MenuItem>
                <MenuItem onClick={() => onRemove(category)}>
                    <ListItemIcon>
                        <RemoveCircleOutlineIcon color="error" />
                    </ListItemIcon>
                    <ListItemText primary="Remove Discount" primaryTypographyProps={{ variant: "body2" }} />
                </MenuItem>
                <MenuItem onClick={() => onUpdate(category)}>
                    <ListItemIcon>
                        <Edit color="primary" />
                    </ListItemIcon>
                    <ListItemText
                        primary="Edit"
                        primaryTypographyProps={{ variant: "body2" }}
                    />
                </MenuItem>
                <MenuItem onClick={() => onDelete(category)}>
                    <ListItemIcon>
                        <DeleteOutline color="error" />
                    </ListItemIcon>
                    <ListItemText primary="Delete" primaryTypographyProps={{ variant: "body2" }} />
                </MenuItem>
            </Menu>
        </>
    )
}

export default ActionMenu;
