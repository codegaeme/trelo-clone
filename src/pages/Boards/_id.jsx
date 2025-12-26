import { Container } from '@mui/material'
import Appbar from '../../components/AppBar'
import BoardBar from './BoardBar'
import BoardContent from './BoardContent'


import {mockData} from '~/apis/mock-data';
const Board = () => {
   
    return (
        <Container disableGutters maxWidth={false} sx={{ height: '100vh', backgroundColor: 'primary.main', width: '100vw', margin: 0, padding: 0 }}>
            <Appbar />
            <BoardBar board ={mockData?.board}/>
            <BoardContent  board ={mockData?.board}/>

        </Container>
    )
}
export default Board;