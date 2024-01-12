import React, {useEffect, useState} from 'react';
import {
    CCollapse,
    CContainer,
    CNavbar,
    CNavbarBrand,
    CNavbarNav,
    CNavbarToggler,
    CNavItem,
    CNavLink
} from "@coreui/react";
import {Link} from "react-router-dom";
import PopupState, {bindPopper, bindToggle} from "material-ui-popup-state";
import Button from "@mui/material/Button";
import {Popper} from "@mui/base";
import {Fade, Paper, Typography} from "@mui/material";
import {Avatar} from "@mui/joy";
import {ImageService} from "../../../api/ImageService";


const NavbarTemp = ({isLoggedIn, onLogout}) => {

    const user = localStorage.getItem("authenticatedUser") ? JSON.parse(localStorage.getItem("authenticatedUser")) : {};

    const [visible, setVisible] = useState(false)

    const [avatar, setAvatar] = useState("");


    useEffect(() => {
        const fetchAvatar = async () => {
            const response = await ImageService.fetchImage(user.avatar);
            setAvatar(response);
        }
        if (isLoggedIn)
            fetchAvatar();
    }, [])

    return (
            <CNavbar placement="fixed-top" expand="lg" colorScheme="light" className="bg-light" style={{marginBottom:0}} >
                <CContainer fluid>
                    <CNavbarToggler
                        aria-label="Toggle navigation"
                        aria-expanded={visible}
                        onClick={() => setVisible(!visible)}
                    />
                    <CCollapse className="navbar-collapse" visible={visible}>
                        <CNavbarBrand >Попутка BY</CNavbarBrand>
                        <CNavbarNav className="me-auto mb-2 mb-lg-0">
                            <CNavItem>
                                <Link to="/posts"><CNavLink >
                                    Главная
                                </CNavLink></Link>
                            </CNavItem>
                            {isLoggedIn &&
                                <CNavItem>
                                    <Link to="/profile"><CNavLink >
                                        Мой профиль
                                    </CNavLink></Link>
                                </CNavItem>
                            }
                        </CNavbarNav>
                        {!isLoggedIn &&
                            <Link to="/auth">
                                <Button variant="contained">
                                    Войти
                                </Button>
                            </Link>
                        }
                        {isLoggedIn &&
                            <PopupState variant="popper" popupId="demo-popup-popper">
                                {(popupState) => (
                                    <div>
                                        <Avatar src={avatar} {...bindToggle(popupState)}/>
                                        <Popper {...bindPopper(popupState)} transition>
                                            {({ TransitionProps }) => (
                                                <Fade {...TransitionProps} timeout={350}>
                                                    <Paper>
                                                        <Typography sx={{ p: 2 }}>
                                                            <Link to="/auth"><Button onClick={onLogout}>Выйти</Button></Link>
                                                        </Typography>
                                                    </Paper>
                                                </Fade>
                                            )}
                                        </Popper>
                                    </div>
                                )}
                            </PopupState>
                        }

                    </CCollapse>
                </CContainer>
            </CNavbar>
    )
};

export default NavbarTemp;