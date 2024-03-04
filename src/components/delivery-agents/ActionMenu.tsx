import { DeleteOutline } from "@mui/icons-material";
import Edit from "@mui/icons-material/Edit";
import MoreVert from "@mui/icons-material/MoreVert";
import RemoveCircle from "@mui/icons-material/RemoveCircle";
import { IconButton, ListItemIcon, ListItemText, Menu, MenuItem } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import { DeliveryAgent } from "../../types";

type PropsActionMenu = {
    deliveryAgent: DeliveryAgent,
    onDelete: (deliveryAgent: DeliveryAgent) => void,
    onBlock: (deliveryAgent: DeliveryAgent) => void,
    onUpdate: (deliveryAgent: DeliveryAgent) => void
}

const ActionMenu = (props: PropsActionMenu) => {
    const { deliveryAgent, onDelete, onBlock, onUpdate } = props;
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
                <MenuItem onClick={() => onUpdate(deliveryAgent)}>
                    <ListItemIcon>
                        <Edit color="primary" />
                    </ListItemIcon>
                    <ListItemText
                        primary="Edit"
                        primaryTypographyProps={{ variant: "body2" }}
                    />
                </MenuItem>
                <MenuItem onClick={() => onDelete(deliveryAgent)}>
                    <ListItemIcon>
                        <DeleteOutline color="error" />
                    </ListItemIcon>
                    <ListItemText primary="Delete" primaryTypographyProps={{ variant: "body2" }} />
                </MenuItem>
                <MenuItem onClick={() => onBlock(deliveryAgent)}>
                    <ListItemIcon>
                        <RemoveCircle color="error" />
                    </ListItemIcon>
                    <ListItemText primary={deliveryAgent.isBlocked ? 'Unblock' : 'Block'} primaryTypographyProps={{ variant: "body2" }} />
                </MenuItem>
            </Menu>
        </>
    )
}

export default ActionMenu;
