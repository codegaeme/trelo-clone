import { Box, Container } from '@mui/material'
import Appbar from '../../components/AppBar'
import BoardBar from './BoardBar'
import BoardContent from './BoardContent'
const Board = () => {
    return (
        <Container
            disableGutters
            maxWidth={false}
            sx={{
                height: '100vh',
                backgroundColor: 'primary.main',
                width: '100vw',
                margin: 0,
                padding: 0
            }}
        >
            <Appbar />
            <BoardBar />
            <BoardContent/>




          

        </Container>
    )
}
export default Board;