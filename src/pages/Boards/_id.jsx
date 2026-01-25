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
        // 1. Clone board để tránh mutate trực tiếp state cũ
        const newBoard = { ...board }

        // 2. Tìm cột cần cập nhật
        const columnToUpdate = newBoard.columns.find(column => column._id === columnId)

        if (columnToUpdate) {
            // KIỂM TRA: Phải dùng columnToUpdate.cards.some
            const hasPlaceholder = columnToUpdate.cards?.some(card => card.FE_PlaceholderCard)

            if (hasPlaceholder) {
                // Nếu có placeholder, có thể bạn muốn lọc bỏ nó đi hoặc thay thế
                // Nhưng thông thường trong hàm MOVE, ta chỉ cần ưu tiên dữ liệu dnd truyền vào
                columnToUpdate.cards = dndOrderedCards
                columnToUpdate.cardOrderIds = dndOrderedCardsIds
            } else {
                // Cập nhật dữ liệu mới từ kết quả kéo thả
                columnToUpdate.cards = dndOrderedCards
                columnToUpdate.cardOrderIds = dndOrderedCardsIds
            }

            // 3. Cập nhật State để UI render lại
            setBoard(newBoard)

            // 4. Gọi API để lưu vào database
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
        newBoard.columns = newBoard.columns.filter(c => c._id !== id)
        newBoard.columnOrderIds = newBoard.columnOrderIds.filter(_id => _id !== id)
        setBoard(newBoard)
        deleteColumnDetailApi(id).then(res => {
            toast.success(res?.deleteResult)
        })
    }
    if (!board) {
        return (
            <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                height: '100vh',
                width: '100vw',
                gap: '10px'
            }}>
                {/* Bạn có thể thay bằng Spinner của Material UI hoặc CSS tự viết */}
                <div className="spinner"></div>
                <span>Đang tải dữ liệu từ server (vui lòng chờ 30s - 1p)...</span>
            </div>
        )
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