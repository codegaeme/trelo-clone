import { Box } from "@mui/material";
const BoardContent = () => {
    return (
        <Box sx={{
            backgroundColor: 'primary.light',
            width: '100%',
            height: (theme) => ({
                height: `calc(100vh - ${theme.trello.appBarHeight} - ${theme.trello.boardBarHeight})`
            }),
            display: 'flex',
            alignItems: 'center',
            px: 2

        }}>
            Content
        </Box>
    )

}
export default BoardContent;