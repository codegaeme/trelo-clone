import { Box } from "@mui/material";

import Typography from '@mui/material/Typography';
import theme from "~/theme"; 
import MoreColum from "./MoreColumn";
const HeaderColumn = (props) => {
    const {columnHeader,deleteColumn} =props
    return (
        <Box sx={{
            height: theme.trello.columnHeaderHeight,
            p: 2,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
        }}>
            <Typography variant="h6">{columnHeader?.title}</Typography>
            <MoreColum columnHeader={columnHeader} deleteColumn={deleteColumn}></MoreColum>
            
        </Box>
    )
}
export default HeaderColumn;