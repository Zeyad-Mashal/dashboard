import React, { useState } from "react"
import { styled, useTheme } from "@mui/material/styles"
import Box from "@mui/material/Box"
import Drawer from "@mui/material/Drawer"
import MuiAppBar from "@mui/material/AppBar"
import Toolbar from "@mui/material/Toolbar"
import Avatar from "@mui/material/Avatar"
import Stack from "@mui/material/Stack"
import List from "@mui/material/List"
import Divider from "@mui/material/Divider"
import IconButton from "@mui/material/IconButton"
import MenuIcon from "@mui/icons-material/Menu"
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft"
import ChevronRightIcon from "@mui/icons-material/ChevronRight"
import ListItemButton from "@mui/material/ListItemButton"
import ListItemIcon from "@mui/material/ListItemIcon"
import ListItemText from "@mui/material/ListItemText"
import Badge from "@mui/material/Badge"
import Popover from "@mui/material/Popover"
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined"

import PersonIcon from "@mui/icons-material/Person"
import SettingsIcon from "@mui/icons-material/Settings"
import InfoIcon from "@mui/icons-material/Info"
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong"
import GroupIcon from "@mui/icons-material/Group"
import TuneIcon from "@mui/icons-material/Tune"
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart"
import LocalShippingIcon from "@mui/icons-material/LocalShipping"
import GridViewIcon from "@mui/icons-material/GridView"
import BarChartIcon from "@mui/icons-material/BarChart"
import LoyaltyIcon from "@mui/icons-material/Loyalty"
import DiscountIcon from "@mui/icons-material/Discount"
import CategoryIcon from "@mui/icons-material/Category"
import { Link, Outlet } from "react-router-dom"
import { ListItem, ListItemAvatar, Typography, useMediaQuery } from "@mui/material"
import { teal, blue } from "@mui/material/colors"
import InventoryIcon from '@mui/icons-material/Inventory';
import ArticleIcon from '@mui/icons-material/Article';
import Logout from '@mui/icons-material/Logout';
import Menu from '@mui/material/Menu';
import { MenuItem as MItem } from '@mui/material';
import NotificationsIcon from '@mui/icons-material/Notifications';
import NewspaperIcon from '@mui/icons-material/Newspaper';
import config from "../utils/config";
import usePost from "../hooks/usePost";
import authHeader from "../utils/auth-header"
import { useNavigate } from "react-router-dom";
import useLogout from "../hooks/useLogout"
const drawerWidth = 240
// @ts-igonre
const Main = styled<any>("main", {
    shouldForwardProp: (prop) => prop !== "open" && prop !== "isMobile",
})(
    // @ts-igonre
    ({ theme, open, isMobile }) => ({
        flexGrow: 1,
        padding: theme.spacing(0),
        transition: theme.transitions.create("margin", {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        marginLeft: !isMobile ? `-${drawerWidth}px` : "0px",
        ...(open && {
            transition: theme.transitions.create("margin", {
                easing: theme.transitions.easing.easeOut,
                duration: theme.transitions.duration.enteringScreen,
            }),
            marginLeft: 0,
        }),
    })
)

const AppBar = styled<any>(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== "open" && prop !== "isMobile",
})(
    // @ts-igonre
    ({ theme, open, isMobile }) => ({
        transition: theme.transitions.create(["margin", "width"], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        ...(open && {
            width: !isMobile ? `calc(100% - ${drawerWidth}px)` : "100%",
            marginLeft: !isMobile ? `${drawerWidth}px` : "0px",
            transition: theme.transitions.create(["margin", "width"], {
                easing: theme.transitions.easing.easeOut,
                duration: theme.transitions.duration.enteringScreen,
            }),
        }),
    })
)

const MenuItem = ({ icon, text, href, selected, onClick }: any) => {
    const theme = useTheme()
    return (
        <Link to={href} style={{ textDecoration: "none", color: "inherit" }} onClick={onClick}>
            <ListItemButton key={text} dense selected={selected}>
                <ListItemIcon>
                    {React.cloneElement(icon, {
                        sx: { color: selected ? theme.palette.primary.main : blue["500"] },
                    })}
                </ListItemIcon>
                <ListItemText
                    primary={text}
                    sx={{
                        "& .MuiListItemText-primary": {
                            fontSize: ".9em",
                            color: selected
                                ? theme.palette.primary.main
                                : theme.palette.text.primary,
                        },
                    }}
                />
            </ListItemButton>
        </Link>
    )
}

const DrawerHeader = styled("div")(({ theme }) => ({
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: "flex-end",
}))

const PersistentDrawerLeft = () => {

    const theme = useTheme()
    const isMobile = useMediaQuery(theme.breakpoints.down("md"))
    const [open, setOpen] = React.useState(!isMobile)
    const [curLocation, setCurLocation] = React.useState(window.location.pathname)
    const [anchorElAccount, setAnchorElAccount] = React.useState<HTMLButtonElement | null>(null)
    const [anchorElNoti, setAnchorElNoti] = React.useState<HTMLButtonElement | null>(null)
    const [openAcc, setOpenAcc] = useState(false)
    const [openNoti, setOpenNoti] = useState(false)

    const navigate = useNavigate();

    const handleDrawerOpen = () => {
        setOpen(true)
    }

    const handleDrawerClose = () => {
        setOpen(false)
    }

    const handleMenuClick = (pathname: string) => {
        if (isMobile) setOpen(false)
        setCurLocation(pathname)
    }
    const handleOpenAccMenu = (event: any) => {
        setAnchorElAccount(event.currentTarget)
        setOpenAcc(true)
    }
    const handleCloseAccMenu = () => {
        setOpenAcc(false)
        setAnchorElAccount(null)
    }

    const handleOpenNotiMenu = (event: any) => {
        setAnchorElNoti(event.currentTarget)
        setOpenNoti(true)
    }
    const handleCloseNotiMenu = () => {
        setOpenNoti(false)
        setAnchorElNoti(null)
    }
    const selected = true


    function handleLogout() {
        localStorage.removeItem("access_token");
        localStorage.removeItem("user");
        navigate("/")
    }

    return (
        <Box sx={{ display: "flex", height: "100%", overflow: "hidden" }}>
            <AppBar
                position="fixed"
                // @ts-igonre
                open={open}
                // @ts-igonre
                isMobile={isMobile}
                color="inherit"
                elevation={0}
            //sx={{ borderBottom: 2, borderColor:theme.palette.primary.main}}
            >
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        edge="start"
                        sx={{ mr: 2, ...(open && { display: "none" }) }}
                    >
                        <MenuIcon />
                    </IconButton>
                    {isMobile && <img src="" alt="FlowerShop    " width="40px" height="40px" />}
                    <span style={{ flexGrow: 1 }}></span>
                    <Stack
                        direction="row"
                        spacing={2}
                        sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}
                    >
                        <IconButton onClick={handleOpenNotiMenu}>
                            <Badge badgeContent={4} color="error">
                                <NotificationsNoneOutlinedIcon color="primary" />
                            </Badge>
                        </IconButton>
                        <Menu
                            anchorEl={anchorElNoti}
                            id="account-menu"
                            open={openNoti}
                            onClose={handleCloseNotiMenu}
                            onClick={handleCloseNotiMenu}
                            PaperProps={{
                                elevation: 0,
                                sx: {
                                    overflow: 'visible',
                                    filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                                    mt: 1.5,
                                    '& .MuiAvatar-root': {
                                        width: 32,
                                        height: 32,
                                        ml: -0.5,
                                        mr: 1,
                                    },
                                    '&:before': {
                                        content: '""',
                                        display: 'block',
                                        position: 'absolute',
                                        top: 0,
                                        right: 14,
                                        width: 10,
                                        height: 10,
                                        bgcolor: 'background.paper',
                                        transform: 'translateY(-50%) rotate(45deg)',
                                        zIndex: 0,
                                    },
                                },
                            }}
                            transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                            anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                        >
                            <MItem>
                                <ListItem disablePadding>
                                    <ListItemAvatar color="warning">
                                        <Avatar sx={{ bgcolor: "salmon" }}> <NotificationsIcon /> </Avatar>
                                    </ListItemAvatar>
                                    <ListItemText primary="New Notification" secondary="In publishing and graphic design" />
                                </ListItem>
                            </MItem>
                            <MItem>
                                <ListItem disablePadding>
                                    <ListItemAvatar>
                                        <Avatar sx={{ bgcolor: "lightblue" }}> <ShoppingCartIcon /> </Avatar>
                                    </ListItemAvatar>
                                    <ListItemText primary="New Order" secondary="In publishing and graphic design" />
                                </ListItem>
                            </MItem>
                        </Menu>
                        <Avatar src="" onClick={handleOpenAccMenu} sx={{ cusrsor: "pointer" }} />
                        <Menu
                            anchorEl={anchorElAccount}
                            id="account-menu"
                            open={openAcc}
                            onClose={handleCloseAccMenu}
                            onClick={handleCloseAccMenu}
                            PaperProps={{
                                elevation: 0,
                                sx: {
                                    overflow: 'visible',
                                    filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                                    mt: 1.5,
                                    '& .MuiAvatar-root': {
                                        width: 32,
                                        height: 32,
                                        ml: -0.5,
                                        mr: 1,
                                    },
                                    '&:before': {
                                        content: '""',
                                        display: 'block',
                                        position: 'absolute',
                                        top: 0,
                                        right: 14,
                                        width: 10,
                                        height: 10,
                                        bgcolor: 'background.paper',
                                        transform: 'translateY(-50%) rotate(45deg)',
                                        zIndex: 0,
                                    },
                                },
                            }}
                            transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                            anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                        >
                            <MItem>
                                <ListItem>
                                    <ListItemAvatar>
                                        <Avatar />
                                    </ListItemAvatar>
                                    <ListItemText primary="Administator" secondary="admin@som.com" />
                                </ListItem>
                            </MItem>
                            <Divider />
                            <MItem onClick={handleLogout}>
                                <ListItemIcon>
                                    <Logout fontSize="small" />
                                </ListItemIcon>
                                Logout
                            </MItem>
                        </Menu>
                    </Stack>
                </Toolbar>
                <Divider />
            </AppBar>
            <Drawer
                sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    "& .MuiDrawer-paper": {
                        width: drawerWidth,
                        boxSizing: "border-box",
                    },
                }}
                variant={isMobile ? "temporary" : "persistent"}
                anchor="left"
                open={open}
            >
                <DrawerHeader>
                    <Typography>Flower Shop Admin</Typography>
                    <IconButton onClick={handleDrawerClose}>
                        {theme.direction === "ltr" ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                    </IconButton>
                </DrawerHeader>
                <List>
                    <MenuItem
                        icon={<GridViewIcon />}
                        selected={curLocation === "/dashboard"}
                        text="Dashboard"
                        href="/dashboard"
                        onClick={() => handleMenuClick("/dashboard")}
                    />
                    <MenuItem
                        icon={<CategoryIcon />}
                        selected={curLocation.includes("categories")}
                        text="Categories"
                        href="/categories"
                        onClick={() => handleMenuClick("/categories")}
                    />
                    {/* <MenuItem
                        icon={<ClassIcon />}
                        selected={curLocation.includes("subcategories")}
                        text="Subcategories"
                        href="/subcategories"
                        onClick={() => handleMenuClick("/subcategories")}
            />*/}

                    <MenuItem
                        icon={<InventoryIcon />}
                        selected={curLocation.includes("products")}
                        text="Products"
                        href="/products"
                        onClick={() => handleMenuClick("/products")}
                    />
                    <MenuItem
                        icon={<PersonIcon />}
                        selected={curLocation.includes("customers")}
                        text="Customers"
                        href="/customers"
                        onClick={() => handleMenuClick("/customers")}
                    />
                    {/* <MenuItem
                        icon={<ShoppingCartIcon />}
                        text="Orders"
                        href="/orders"
                        selected={curLocation.includes("orders")}
                        onClick={() => {
                            handleMenuClick("/orders")
                        }}
                    />
                    <MenuItem
                        icon={<LocalShippingIcon />}
                        selected={curLocation === "/delivery"}
                        text="Delivery"
                        href="/delivery"
                        onClick={() => handleMenuClick("/delivery")}
                    />*/}
                    {/* <MenuItem
                        icon={<LoyaltyIcon />}
                        text="Subscriptions"
                        href="/subscriptions"
                        selected={curLocation === "/subscriptions"}
                        onClick={() => handleMenuClick("subscriptions")}
                />*/}
                    <MenuItem
                        icon={<DiscountIcon />}
                        text="Coupons"
                        href="/coupons"
                        selected={curLocation === "/coupons"}
                        onClick={() => handleMenuClick("coupons")}
                    />
                    {/* <MenuItem
                        icon={<TuneIcon />}
                        text="Sliders"
                        href="/sliders"
                        selected={curLocation === "/"}
                        onClick={() => {
                            console.log(selected)
                            setCurLocation("")
                        }}
                    />
                    <MenuItem
                        icon={<GroupIcon />}
                        text="Users"
                        href="/users"
                        selected={curLocation === "/"}
                        onClick={() => {
                            console.log(selected)
                            setCurLocation("")
                        }}
                    />
                    <MenuItem
                        icon={<NewspaperIcon />}
                        text="NewsLetters"
                        href="/newsletters"
                        selected={curLocation === "/"}
                        onClick={() => {
                            console.log(selected)
                            setCurLocation("")
                        }}
                    />
                   {/* <MenuItem
                        icon={<BarChartIcon />}
                        text="Financial Reports"
                        href="/reports"
                        selected={curLocation === "/"}
                        onClick={() => {
                            console.log(selected)
                            setCurLocation("")
                        }}
                    />*/}
                    <MenuItem
                        icon={<ArticleIcon />}
                        text="Blogs"
                        href="/blogs"
                        selected={curLocation === "/"}
                        onClick={() => {
                            console.log(selected)
                            setCurLocation("")
                        }}
                    />
                </List>
                <Divider />
                <List>
                    <MenuItem
                        icon={<SettingsIcon />}
                        text="Settings"
                        href="/settings"
                        selected={curLocation === "/"}
                        onClick={() => {
                            console.log(selected)
                            setCurLocation("")
                        }}
                    />
                    <MenuItem
                        icon={<InfoIcon />}
                        text="About"
                        href="/about"
                        selected={curLocation === "/"}
                        onClick={() => {
                            console.log(selected)
                            setCurLocation("")
                        }}
                    />
                </List>
            </Drawer>
            <Main
                open={open}
                isMobile={isMobile}
                sx={{ height: "100%", overflow: "auto", display: "flex", flexDirection: "column" }}
            >
                <DrawerHeader />
                <Outlet />
            </Main>
        </Box>
    )
}

export default PersistentDrawerLeft
