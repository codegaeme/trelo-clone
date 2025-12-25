import { Box, Tooltip } from "@mui/material";
import Typography from '@mui/material/Typography';
import GroupAvatars from "./GroupAvatars";
import FilterListIcon from '@mui/icons-material/FilterList';
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';
import Share from "./Share";
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
const BoardBar = () => {
    return (
        <Box px={2} sx={{
            backgroundColor:  (theme) => theme.trello.colorBoardBar,
            width: '100%',
            height: (theme) => theme.trello.boardBarHeight,
            display: 'flex',
            alignItems: 'center',
            color: '#fff'
        }}>

            { }
            <Box sx={{
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',

            }}>
                <Typography fontWeight={1000}>
                    Bảng Trello của tôi
                </Typography>


            </Box>
            <Box sx={{
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'flex-end',
                gap: '20px'

            }}>
                <GroupAvatars />
                <Tooltip title="Lọc"><FilterListIcon sx={{cursor:'pointer'}} /></Tooltip>
                <Tooltip title="Khả năng xem"><SupervisorAccountIcon sx={{cursor:'pointer'}}  /></Tooltip>
                <Share></Share>
                <Tooltip title="Xem thêm"   ><MoreHorizIcon sx={{cursor:'pointer'}}  /></Tooltip>






            </Box>

        </Box>
    )

}
export default BoardBar;