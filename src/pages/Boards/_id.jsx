import { Container } from '@mui/material'
import Appbar from '../../components/AppBar'
import BoardBar from './BoardBar'
import BoardContent from './BoardContent'
import { useEffect, useState } from 'react'
import { fetchBoardDetailApi, createNewColumns, createNewCards, updateBoardDetailApi, updateColumnDetailApi, moveCardDifferentColumnApi, deleteColumnDetailApi } from '~/apis'
import { isEmpty } from 'lodash'
import { generatePlaceholderCard } from '~/utils/formatters'
import { toast } from 'react-toastify'
// import { mockData } from '~/apis/mock-data';

const Board = () => {
    const [board, setBoard] = useState(null)
    const boardId = '6968fb3b1498ae98768a569b'
    useEffect(() => {

        fetchBoardDetailApi(boardId)
            .then(board => {
                board.columns.forEach(column => {
                    if (isEmpty(column.cards)) {

                        column.cards = [generatePlaceholderCard(column)]
                        column.cardOrderIds = [generatePlaceholderCard(column)._id]
                    }
                });

                setBoard(board)
            })
    }, [])

    const createNewColumn = async (newColumnData) => {
        const createdColumn = await createNewColumns({
            ...newColumnData,
            boardId: board._id
        })

        // 1. Tạo placeholder card và dùng chung 1 biến để ID đồng nhất
        const placeholderCard = generatePlaceholderCard(createdColumn)
        createdColumn.cards = [placeholderCard]
        createdColumn.cardOrderIds = [placeholderCard._id]


        const newBoard = { ...board }
        newBoard.columns = [...newBoard.columns, createdColumn]
        newBoard.columnOrderIds = [...newBoard.columnOrderIds, createdColumn._id]

        setBoard(newBoard)
    }

    const createNewCard = async (newCardData) => {
        const createdCard = await createNewCards({
            ...newCardData,
            boardId: board._id
        })

        const newBoard = { ...board }
        const columnToUpdate = newBoard.columns.find(column => column._id === createdCard.columnId)

        if (columnToUpdate) {

            columnToUpdate.cards.push(createdCard)
            columnToUpdate.cardOrderIds.push(createdCard._id)
        }

        setBoard(newBoard)
    }
    const moveColumns = (dndOrderedColumns) => {
        const dndOrderedColumnsIds = dndOrderedColumns.map(c => c._id);
        const newBoard = { ...board }
        newBoard.columns = dndOrderedColumns
        newBoard.columnOrderIds = dndOrderedColumnsIds
        setBoard(newBoard)
        updateBoardDetailApi(newBoard._id, { columnOrderIds: newBoard.columnOrderIds })

    }
    const moveCardInColumn = (dndOrderedCards, dndOrderedCardsIds, columnId) => {
        const newBoard = { ...board }
        const columnToUpdate = newBoard.columns.find(column => column._id === columnId)

        if (columnToUpdate) {

            if (columnToUpdate.some(card => card.FE_PlaceholderCard)) {
                columnToUpdate.cards = [createdCard]
                columnToUpdate.cardOrderIds = createdCard._id
            } else {

                columnToUpdate.cards = dndOrderedCards
                columnToUpdate.cardOrderIds = dndOrderedCardsIds
            }

            setBoard(newBoard)
            updateColumnDetailApi(columnId, { cardOrderIds: dndOrderedCardsIds })


        }
    }
    const moveCardDifferentColumn = (currentCardId, prevColumnId, nextColumnId, dndOrderedColumns) => {

        const newBoard = { ...board }
        const dndOrderedColumnsIds = dndOrderedColumns.map(c => c._id);
        newBoard.columns = dndOrderedColumns
        newBoard.columnOrderIds = dndOrderedColumnsIds
        setBoard(newBoard)
        let prevCardOrderIds = dndOrderedColumns.find(c => c._id === prevColumnId)?.cardOrderIds
        if (prevCardOrderIds[0].includes('placeholder-card')) {
            prevCardOrderIds = []
        }
        moveCardDifferentColumnApi({
            currentCardId,
            prevColumnId,
            prevCardOrderIds,
            nextColumnId,
            nextCardOrderIds: dndOrderedColumns.find(c => c._id === nextColumnId)?.cardOrderIds,
        })


    }
    const deleteColumn = (id) => {
         const newBoard = { ...board }
            newBoard.columns = newBoard.columns.filter(c=>c._id !== id)
            newBoard.columnOrderIds = newBoard.columnOrderIds.filter(_id =>_id !== id )
            setBoard(newBoard)
        deleteColumnDetailApi(id).then(res => {
           toast.success(res?.deleteResult)
        })
    }


    return (
        <Container disableGutters maxWidth={false} sx={{ height: '100vh', backgroundColor: 'primary.main', width: '100vw', margin: 0, padding: 0 }}>
            <Appbar />
            <BoardBar board={board} />
            <BoardContent board={board} createNewColumns={createNewColumn} createNewCard={createNewCard} moveColumns={moveColumns} moveCardInColumn={moveCardInColumn} moveCardDifferentColumn={moveCardDifferentColumn} deleteColumn={deleteColumn} />

        </Container>
    )
}
export default Board;