import * as React from 'react';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Fade from '@mui/material/Fade';
import { Tooltip } from '@mui/material';
export default function Notification() {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <div>

            <Tooltip title="Thông báo">
                <NotificationsNoneIcon  sx={{ color: '#fff !important' , display:'flex' ,alignItems:'center' }} id="fade-button"
                    aria-controls={open ? 'fade-menu' : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? 'true' : undefined}
                    onClick={handleClick}></NotificationsNoneIcon>
            </Tooltip>
     
            <Menu
                id="fade-menu"
                slotProps={{
                    list: {
                        'aria-labelledby': 'fade-button',
                    },
                }}
                slots={{ transition: Fade }}
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
            >
                <MenuItem onClick={handleClose}>Profile</MenuItem>
                <MenuItem onClick={handleClose}>My account</MenuItem>
                <MenuItem onClick={handleClose}>Logout</MenuItem>
            </Menu>
        </div>
    );
}