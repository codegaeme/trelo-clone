import { Box } from "@mui/material";
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import Typography from '@mui/material/Typography';
import theme from "~/theme"; 
const HeaderColumn = ({columnHeader}) => {
    return (
        <Box sx={{
            height: theme.trello.columnHeaderHeight,
            p: 2,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
        }}>
            <Typography variant="h6">{columnHeader?.title}</Typography>
            <MoreHorizIcon sx={{ cursor: 'pointer' }} ></MoreHorizIcon>
        </Box>
    )
}
export default HeaderColumn;