import { DeleteOutline } from "@mui/icons-material";
import Edit from "@mui/icons-material/Edit";
import MoreVert from "@mui/icons-material/MoreVert";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import { IconButton, ListItemIcon, ListItemText, Menu, MenuItem } from "@mui/material";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Customer } from "../../types";

type PropsActionMenu = {
    customer: Customer,
    onDelete: (customer: Customer) => void,
    onUpdate: (customer: Customer) => void
}

const ActionMenu = (props: PropsActionMenu) => {
    const { customer } = props;
    console.log(customer)
    const [open, setOpen] = React.useState(false);
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const navigate = useNavigate();

    const handleMenuClick = (e: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(e.currentTarget);
        setOpen(true);
    }

    const handleClose = () => {
        setAnchorEl(null);
        setOpen(false);
    }

    const onView = (customer) => {
        navigate(`/customer-view/${customer.id}`)
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
                <MenuItem onClick={() => onView(customer)}>
                    <ListItemIcon>
                        <RemoveRedEyeIcon color="primary" />
                    </ListItemIcon>
                    <ListItemText
                        primary="View Customer"
                        primaryTypographyProps={{ variant: "body2" }}
                    />
                </MenuItem>
            </Menu>
        </>
    )
}

export default ActionMenu;
