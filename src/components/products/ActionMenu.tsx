import { DeleteOutline } from "@mui/icons-material";
import Edit from "@mui/icons-material/Edit";
import MoreVert from "@mui/icons-material/MoreVert";
import RemoveCircle from "@mui/icons-material/RemoveCircle";
import RemoveRedEye from "@mui/icons-material/RemoveRedEye";

import { IconButton, ListItemIcon, ListItemText, Menu, MenuItem } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import { Category, Product } from "../../types";

type PropsActionMenu = {
    product: Product,
    onUpdate: (product: Product) => void
    onDelete: (product: Product) => void,
}

const ActionMenu = (props: PropsActionMenu) => {
    const { product, onDelete, onUpdate } = props;
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
                <MenuItem component={Link} to={`/product-view/${product.id}`}>
                    <ListItemIcon>
                        <RemoveRedEye color="success" />
                    </ListItemIcon>
                    <ListItemText
                        primary="View"
                        primaryTypographyProps={{ variant: "body2" }}
                    />
                </MenuItem>
                <MenuItem onClick={() => onUpdate(product)}>
                    <ListItemIcon>
                        <Edit color="primary" />
                    </ListItemIcon>
                    <ListItemText
                        primary="Edit"
                        primaryTypographyProps={{ variant: "body2" }}
                    />
                </MenuItem>
                <MenuItem onClick={() => onDelete(product)}>
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
