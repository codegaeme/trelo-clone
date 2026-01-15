import { Container } from '@mui/material'
import Appbar from '../../components/AppBar'
import BoardBar from './BoardBar'
import BoardContent from './BoardContent'
import { useEffect, useState } from 'react';
import { fetchBoardDetailApi } from '~/apis';
// import { mockData } from '~/apis/mock-data';

const Board = () => {
   const [board,setBoard] = useState(null)

   useEffect(()=>{
    const boardId = '6968fb3b1498ae98768a569b'

    fetchBoardDetailApi(boardId)
    .then(board => {  
        setBoard(board)
    })
   },[])
    return (
        <Container disableGutters maxWidth={false} sx={{ height: '100vh', backgroundColor: 'primary.main', width: '100vw', margin: 0, padding: 0 }}>
            <Appbar />
            <BoardBar board ={board}/>
            <BoardContent  board ={board}/>

        </Container>
    )
}
export default Board;