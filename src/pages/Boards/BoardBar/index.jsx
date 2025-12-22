import { Box } from "@mui/material";
const BoardBar = () => {
    return (
        <Box sx={{
            backgroundColor: 'primary',
            width: '100%',
            height: (theme) => theme.trello.boardBarHeight,
            display: 'flex',
            alignItems: 'center',
            px: 2
        }}>
            Board Content
        </Box>
    )

}
export default BoardBar;