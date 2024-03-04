import React, { useRef, useState } from "react"
import { Link as RouterLink } from "react-router-dom"
import { Menu, MenuItem, IconButton, ListItemIcon, ListItemText } from "@mui/material"
import { Edit, DeleteOutline, MoreVert, RemoveRedEye } from "@mui/icons-material"
import ConfirmDialog from "../../components/ConfirmDialog"

// ----------------------------------------------------------------------

type propTypes = {
    viewLink?:string,
    editLink: string,
    handleDelete?: () => void | undefined,
    id: string
}

function TableMoreMenu({ viewLink, editLink, handleDelete, id }: propTypes) {
    const ref = useRef(null)
    const [isOpen, setIsOpen] = useState(false)
    const [open, setOpen] = useState(true);
    const [confirmOpen, setConfirmOpen] = useState(false);


    return (
        <>
            <IconButton ref={ref} onClick={() => setIsOpen(true)}>
                <MoreVert />
            </IconButton>
            <Menu
                open={isOpen}
                anchorEl={ref.current}
                onClose={() => setIsOpen(false)}
                PaperProps={{
                    sx: { width: 200, maxWidth: "100%" },
                }}
                anchorOrigin={{ vertical: "top", horizontal: "right" }}
                transformOrigin={{ vertical: "top", horizontal: "right" }}
            >
                   {viewLink ? (
                    <MenuItem
                        component={RouterLink}
                        to={viewLink}
                        sx={{ color: "text.secondary" }}
                    >
                        <ListItemIcon>
                            <RemoveRedEye color="success"/>
                        </ListItemIcon>
                        <ListItemText
                            primary="View"
                            primaryTypographyProps={{ variant: "body2" }}
                        />
                    </MenuItem>
                ) : null}
                {editLink ? (
                    <MenuItem
                        component={RouterLink}
                        to={editLink}
                        sx={{ color: "text.secondary" }}
                    >
                        <ListItemIcon>
                            <Edit color="primary" />
                        </ListItemIcon>
                        <ListItemText
                            primary="Edit"
                            primaryTypographyProps={{ variant: "body2" }}
                        />
                    </MenuItem>
                ) : null}
                <MenuItem onClick={() => setConfirmOpen(true) } sx={{ color: "text.secondary" }}>

                    <ListItemIcon>
                        <DeleteOutline color="error" />
                    </ListItemIcon>

                    <ListItemText primary="Delete" primaryTypographyProps={{ variant: "body2" }} />
                </MenuItem>
            </Menu>

            <ConfirmDialog 
             title="Are you sure to delete"
             open={confirmOpen}
             setOpen={setConfirmOpen}
             onConfirm={handleDelete}
            />
        </>
    )
}

export default TableMoreMenu
