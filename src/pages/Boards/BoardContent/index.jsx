import { Box, Button } from "@mui/material";
import ColumnBoard from "./ListColumns/ColumnBoard";
import LibraryAddIcon from '@mui/icons-material/LibraryAdd';
import { mapOrder } from '~/utils/sorts'
import { DndContext, PointerSensor, useSensor, useSensors, MouseSensor, TouchSensor, DragOverlay, defaultDropAnimationSideEffects, closestCorners } from "@dnd-kit/core";
import { arrayMove, horizontalListSortingStrategy, SortableContext } from "@dnd-kit/sortable";
import { useEffect, useState } from "react";
import CardFul from "./ListColumns/Columns/ListCard/Card/CardFul";
import { cloneDeep } from "lodash";
const ACTIVE_DRAG_ITEM_TYPE = {
    'COLUMN': 'ACTIVE_DRAG_ITEM_TYPE_COLUMN',
    'CARD': 'ACTIVE_DRAG_ITEM_TYPE_CARD'
}
const BOARD_CONTENT_PADDING_Y = '20px';

const BoardContent = (props) => {

    const mountSensor = useSensor(MouseSensor, { activationConstraint: { distance: 10 } })
    const touchSensor = useSensor(TouchSensor, { activationConstraint: { delay: 250, tolerance: 5 } })

    // const sensors = useSensors(pointerSensor)
    const sensors = useSensors(mountSensor, touchSensor)

    const { board } = props;
    const [orderedColumns, setOrderedColumns] = useState([]);
    const [activeDragItemId, setActiveDragItemId] = useState(null);
    const [activeDragItemType, setActiveDragItemType] = useState(null);
    const [activeDragItemData, setActiveDragItemData] = useState(null);
    useEffect(() => {
        setOrderedColumns(mapOrder(board?.columns, board?.columnOrderIds, '_id'))
    }, [board])

    //end
    const handelDragEnd = (e) => {
        console.log('Drag:', e);
        if (activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.CARD) return

        const { active, over } = e
        if (!active || !over) return
        if (active.id !== over.id) {
            const oldIndex = orderedColumns.findIndex(c => c._id === active.id)
            const NewIndex = orderedColumns.findIndex(c => c._id === over.id)
            const dndOrderedColumns = arrayMove(orderedColumns, oldIndex, NewIndex)
            const dndOrderedColumnsIds = dndOrderedColumns.map(c => c._id);
            setOrderedColumns(dndOrderedColumns)
        }
        setActiveDragItemId(null)
        setActiveDragItemType(null)
        setActiveDragItemData(null)

    }

    //start
    const handelDragStart = (e) => {
        console.log('start:', e);

        setActiveDragItemId(e?.active?.id)
        setActiveDragItemType(e?.active?.data?.current?.columnId ? ACTIVE_DRAG_ITEM_TYPE.CARD : ACTIVE_DRAG_ITEM_TYPE.COLUMN)
        setActiveDragItemData(e?.active?.data?.current)

    }

    //over
    const handelDragOver = (e) => {
        if (activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.COLUMN) return
        console.log('over:', e);
        const { active, over } = e
        if (!active || !over) return

        //card dang dc keo
        const { id: activeDraggingCardId, data: { current: activeDraggingCardData } } = active
        // card dang tuong tac
        const { id: overCardId } = over
        //tim column


        const activeColumn = findColumnByCardId(activeDraggingCardId)
        const overColumn = findColumnByCardId(overCardId)
        console.log('activeColumn:', activeColumn);
        if (!activeColumn || !overColumn) return

        if (activeColumn._id !== overColumn) {
            setOrderedColumns(prevColumns => {
                const overCardIndex = overColumn?.cards.findIndex(card => card._id === overCardId)
                let newCardIndex
                const isBelowOverItem = active.rect.current.translated && active.rect.current.translated.top > over.rect.top + over.rect.height
                const modifier = isBelowOverItem ? 1 : 0

                newCardIndex = overCardIndex >= 0 ? overCardIndex + modifier : overColumn?.cards?.length + 1

                const nextColums = cloneDeep(prevColumns)
                const nextActiveColumns = nextColums.find(column => column._id === activeColumn._id)
                const nextOverColumns = nextColums.find(column => column._id === overColumn._id)

                console.log('nextActiveColumns:', nextActiveColumns);


                if (nextActiveColumns) {
                    //xoa card
                    nextActiveColumns.cards = nextActiveColumns.cards.filter(card => card._id !== activeDraggingCardId)
                    //sap xep lai vi tri
                    nextActiveColumns.cardOrderIds = nextActiveColumns.cards.map(card => card._id)

                }
                if (nextOverColumns) {
                    //kiem tra card dang keo co trong chuwa neu co xoa bo
                    nextOverColumns.cards = nextOverColumns.cards.filter(card => card._id !== activeDraggingCardId)
                    //them card vao column
                    nextOverColumns.cards = nextOverColumns.cards.toSpliced(newCardIndex, 0, activeDraggingCardData)
                    //sap xep lai
                    nextOverColumns.cardOrderIds = nextOverColumns.cards.map(card => card._id)
                }
                return nextColums
            })
        }
    }
    //timf cl
    const findColumnByCardId = (cardId) => {
        return orderedColumns.find((column) => {

            return column.cards.map(card => card._id).includes(cardId);
        });
    };
    //animation
    const customDropAnimation = {
        sideEffects: defaultDropAnimationSideEffects({
            styles: {
                active: {
                    opacity: '0.5',
                },
            },
        }),
    };
    return (
        <DndContext

            sensors={sensors}
            collisionDetection={closestCorners}
            onDragStart={handelDragStart}
            onDragOver={handelDragOver}
            onDragEnd={handelDragEnd}>
            <Box sx={{
                backgroundColor: (theme) => theme.trello.colorBoardContent,
                width: '100%',
                height: (theme) => theme.trello.boardContentHeight,
                display: 'flex',
                color: '#fff',
                boxSizing: 'border-box',

                // Padding bạn đã thêm (10px trên/dưới, 30px trái/phải)
                padding: '25px 25px',



                overflowX: 'auto',
                overflowY: 'hidden',
                gap: '25px'

            }}>
                <DragOverlay dropAnimation={customDropAnimation}>
                    {(!activeDragItemType) && null}
                    {(activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.COLUMN && <ColumnBoard column={activeDragItemData} />)}
                    {(activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.CARD && <CardFul card={activeDragItemData} />)}
                </DragOverlay>
                <SortableContext items={orderedColumns?.map(c => c._id)} strategy={horizontalListSortingStrategy}>
                    {
                        orderedColumns?.map(column => <ColumnBoard key={column._id} column={column} />)
                    }
                </SortableContext>

                <Box sx={{
                    minWidth: '200px',
                    maxWidth: '200px',
                    mx: '2',
                    borderRadius: '6px',
                    height: 'fit-content',
                    bgcolor: '#ffffff3d'

                }}>
                    <Button startIcon={<LibraryAddIcon />} sx={{ color: '#fff', width: '100%', justifyContent: 'flex-start', pl: '2.5', py: '1' }}>Add new column</Button>
                </Box>


            </Box>
        </DndContext>
    );
};

export default BoardContent;