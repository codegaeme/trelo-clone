import { Container } from '@mui/material'
import Appbar from '../../components/AppBar'
import BoardBar from './BoardBar'
import BoardContent from './BoardContent'
import { useEffect, useState } from 'react'
import { fetchBoardDetailApi, createNewColumns, createNewCards } from '~/apis'
import { isEmpty } from 'lodash'
import { generatePlaceholderCard } from '~/utils/formatters'
// import { mockData } from '~/apis/mock-data';

const Board = () => {
    const [board, setBoard] = useState(null)
    const boardId = '6968fb3b1498ae98768a569b'
    useEffect(() => {


        fetchBoardDetailApi(boardId)
            .then(board => {
                board.columns.forEach(column => {
                    if (isEmpty(column.cards)) {
                    column.cards=[generatePlaceholderCard(column)]
                    column.cardOrderIds=[generatePlaceholderCard(column)._id]
                    }
                });
                setBoard(board)
            })
    }, [])

    const createNewColumn = async (newColumnData) => {
        const createNewColumnData = await createNewColumns({
            ...newColumnData,
            boardId: board._id
        })

        createNewColumnData.cards = [generatePlaceholderCard(createNewColumnData)]
        createNewColumnData.cardOrderIds = [generatePlaceholderCard(createNewColumnData)._id]


        const newBoard = { ...board }
        newBoard.columns.push(createNewColumnData)
        newBoard.columnOrderIds.push(createNewColumnData)
        setBoard(newBoard)

    }



    const createNewCard = async (newCardData) => {
        const createNewCard = await createNewCards({
            ...newCardData,
            boardId: board._id
        })

        const newBoard = { ...board }
        const columnToUpdate = newBoard.columns.find(column => column._id === createNewCard.columnId)
        if (columnToUpdate) {
            columnToUpdate.cards.push(createNewCard)
            columnToUpdate.cardOrderIds.push(createNewCard)
        }
        setBoard(newBoard)
    }


    return (
        <Container disableGutters maxWidth={false} sx={{ height: '100vh', backgroundColor: 'primary.main', width: '100vw', margin: 0, padding: 0 }}>
            <Appbar />
            <BoardBar board={board} />
            <BoardContent board={board} createNewColumns={createNewColumn} createNewCard={createNewCard} />

        </Container>
    )
}
export default Board;