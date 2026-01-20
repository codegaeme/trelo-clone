import { Box, Button, Tooltip } from "@mui/material";
import AddCardIcon from '@mui/icons-material/AddCard';
import theme from "~/theme";
import { DragHandle } from "@mui/icons-material";


const FooterColumn = (props) => {
   const {newAddCard,newFormAddCard} = props

 
    return (
        !newAddCard ?
            <Box sx={{
                height: theme.trello.columnFooterHeight,
                p: 2,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
            }}>
                <Button onClick={newFormAddCard} startIcon={<AddCardIcon />}>Add new card</Button>
                <Tooltip title="Drap to move">
                    <DragHandle sx={{ cursor: 'pointer' }}></DragHandle>
                </Tooltip>
            </Box>
            :
            <Box/>
    )
}
export default FooterColumn;