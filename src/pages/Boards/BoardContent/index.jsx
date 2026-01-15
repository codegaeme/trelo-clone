import { Box, Button, IconButton, TextField } from "@mui/material";
import ColumnBoard from "./ListColumns/ColumnBoard";
import LibraryAddIcon from '@mui/icons-material/LibraryAdd';
import { mapOrder } from '~/utils/sorts'
import { DndContext, PointerSensor, useSensor, useSensors, DragOverlay, defaultDropAnimationSideEffects, closestCorners, pointerWithin, rectIntersection, getFirstCollision, closestCenter } from "@dnd-kit/core";
import { arrayMove, horizontalListSortingStrategy, SortableContext } from "@dnd-kit/sortable";
import { useCallback, useEffect, useRef, useState } from "react";
import CardFul from "./ListColumns/Columns/ListCard/Card/CardFul";
import { cloneDeep, isEmpty } from "lodash";
import { generatePlaceholderCard } from "~/utils/formatters";
import ClearIcon from '@mui/icons-material/Clear';
import {MouseSensor,TouchSensor} from '~/customLibarys/DndKitSenSor';
import { toast } from "react-toastify";

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
    const [oldColumn, setOldColumn] = useState(null);
    const lastOverId = useRef(null)
    const [openNewColumnForm, setOpenNewColumnForm] = useState(false)
    const toggleOpenNewColumnForm = () => setOpenNewColumnForm(!openNewColumnForm)
    useEffect(() => {
        setOrderedColumns(mapOrder(board?.columns, board?.columnOrderIds, '_id'))
    }, [board])

    //function xu li cap nhat state keo card
    const [newColumnTitle, setNewColumnTitle] = useState("")
    const addNewColumn = () => {
        if (!newColumnTitle) {
           toast.error('Please enter columns title')

            return
        }

        console.log(newColumnTitle);

        toggleOpenNewColumnForm()
        setNewColumnTitle("")

    }

    const moveCardBetweenDifferentColumns = (
        overColumn,
        overCardId,
        active,
        over,
        activeColumn,
        activeDraggingCardId,
        activeDraggingCardData
    ) => {
        setOrderedColumns(prevColumns => {
            const overCardIndex = overColumn?.cards.findIndex(card => card._id === overCardId)
            let newCardIndex
            const isBelowOverItem = active.rect.current.translated && active.rect.current.translated.top > over.rect.top + over.rect.height
            const modifier = isBelowOverItem ? 1 : 0

            newCardIndex = overCardIndex >= 0 ? overCardIndex + modifier : overColumn?.cards?.length + 1

            const nextColums = cloneDeep(prevColumns)
            const nextActiveColumns = nextColums.find(column => column._id === activeColumn._id)
            const nextOverColumns = nextColums.find(column => column._id === overColumn._id)




            if (nextActiveColumns) {
                //xoa card
                nextActiveColumns.cards = nextActiveColumns.cards.filter(card => card._id !== activeDraggingCardId)

                //them giu cho cho card trong

                if (isEmpty(nextActiveColumns.cards)) {
                    nextActiveColumns.cards = [generatePlaceholderCard(nextActiveColumns)]
                }

                //sap xep lai vi tri
                nextActiveColumns.cardOrderIds = nextActiveColumns.cards.map(card => card._id)

            }
            if (nextOverColumns) {
                const rebuild_activeDraggingCardData = {
                    ...activeDraggingCardData,
                    columnId: nextOverColumns._id
                }
                //kiem tra card dang keo co trong chuwa neu co xoa bo
                nextOverColumns.cards = nextOverColumns.cards.filter(card => card._id !== activeDraggingCardId)
                //xoa card giu cho
                nextOverColumns.cards = nextOverColumns.cards.filter(card => !card.FE_PlaceholderCard)
                //them card vao column
                nextOverColumns.cards = nextOverColumns.cards.toSpliced(newCardIndex, 0, rebuild_activeDraggingCardData)
                //sap xep lai
                nextOverColumns.cardOrderIds = nextOverColumns.cards.map(card => card._id)
            }
            return nextColums
        })
    }

    //start
    const handelDragStart = (e) => {

        setActiveDragItemId(e?.active?.id)
        setActiveDragItemType(e?.active?.data?.current?.columnId ? ACTIVE_DRAG_ITEM_TYPE.CARD : ACTIVE_DRAG_ITEM_TYPE.COLUMN)
        setActiveDragItemData(e?.active?.data?.current)
        if (e?.active?.data?.current?.columnId) {
            setOldColumn(findColumnByCardId(e?.active?.id))
        }
    }


    //over
    const handelDragOver = (e) => {
        if (activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.COLUMN) return

        const { active, over } = e
        if (!active || !over) return

        //card dang dc keo
        const { id: activeDraggingCardId, data: { current: activeDraggingCardData } } = active
        // card dang tuong tac
        const { id: overCardId } = over
        //tim column


        const activeColumn = findColumnByCardId(activeDraggingCardId)
        const overColumn = findColumnByCardId(overCardId)

        if (!activeColumn || !overColumn) return

        if (activeColumn._id !== overColumn) {
            moveCardBetweenDifferentColumns(
                overColumn,
                overCardId,
                active,
                over,
                activeColumn,
                activeDraggingCardId,
                activeDraggingCardData
            )
        }
    }

    //end
    const handelDragEnd = (e) => {
        const { active, over } = e
        if (!active || !over) return
        if (activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.CARD) {
            //card dang dc keo
            const { id: activeDraggingCardId, data: { current: activeDraggingCardData } } = active
            // card dang tuong tac
            const { id: overCardId } = over
            //tim column
            const activeColumn = findColumnByCardId(activeDraggingCardId)
            const overColumn = findColumnByCardId(overCardId)


            //keo card khac column
            if (!activeColumn || !overColumn) return

            if (oldColumn._id !== overColumn._id) {
                moveCardBetweenDifferentColumns(
                    overColumn,
                    overCardId,
                    active,
                    over,
                    activeColumn,
                    activeDraggingCardId,
                    activeDraggingCardData
                )
            }
            //cung column
            else {
                const oldCardIndex = oldColumn?.cards?.findIndex(c => c._id === activeDragItemId)
                const newCardIndex = overColumn?.cards?.findIndex(c => c._id === overCardId)
                const dndOrderedCards = arrayMove(oldColumn?.cards, oldCardIndex, newCardIndex)
                setOrderedColumns(prevColumns => {
                    const nextColumns = cloneDeep(prevColumns)
                    const targetColumn = nextColumns.find(c => c._id === overColumn._id)

                    targetColumn.cards = dndOrderedCards
                    targetColumn.cardOrderIds = dndOrderedCards.map(card => card.id)
                    return nextColumns
                })
            }
        }
        //xu li column
        if (activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.COLUMN) {
            if (!active || !over) return
            if (active.id !== over.id) {
                const oldColumnIndex = orderedColumns.findIndex(c => c._id === active.id)
                const newColumnIndex = orderedColumns.findIndex(c => c._id === over.id)
                const dndOrderedColumns = arrayMove(orderedColumns, oldColumnIndex, newColumnIndex)
                const dndOrderedColumnsIds = dndOrderedColumns.map(c => c._id);
                setOrderedColumns(dndOrderedColumns)
            }
        }



        setActiveDragItemId(null)
        setActiveDragItemType(null)
        setActiveDragItemData(null)
        setOldColumn(null)

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
    //collisionDetectionStrategy
    const collisionDetectionStrategy = useCallback((args) => {
        if (activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.COLUMN) {
            return closestCorners({ ...args })
        }
        const pointerIntersections = pointerWithin(args)
        if (!pointerIntersections?.length) {
            return
        }
        // const intersections = !!pointerIntersections?.length ? pointerIntersections : rectIntersection(args)
        let overId = getFirstCollision(pointerIntersections, 'id')
        if (overId) {



            const checkColumn = orderedColumns.find(column => column._id === overId)
            if (checkColumn) {
                overId = closestCorners({
                    ...args,
                    droppableContainers: args.droppableContainers.filter((container) => {
                        return (container.id !== overId) && (checkColumn?.cardOrderIds?.includes(container.id))
                    })
                })[0]?.id
            }
            lastOverId.current = overId
            return [{ id: overId }]
        }
        return lastOverId.current ? [{ id: lastOverId.current }] : []
    }, [activeDragItemType, orderedColumns])
    return (
        <DndContext

            sensors={sensors}
            /*collisionDetection={closestCorners}*/
            collisionDetection={collisionDetectionStrategy}
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

                {!openNewColumnForm
                    ? <Box onClick={toggleOpenNewColumnForm} sx={{
                        minWidth: '260px',
                        maxWidth: '260px',
                        mx: '2',
                        borderRadius: '6px',
                        height: 'fit-content',
                        bgcolor: '#ffffff3d'

                    }}>
                        <Button startIcon={<LibraryAddIcon />} sx={{ color: '#fff', width: '100%', justifyContent: 'flex-start', pl: '2.5', py: '1' }}>Add new column</Button>
                    </Box>
                    :
                    <Box

                        sx={{
                            minWidth: '260px',
                            maxWidth: '260px',
                            mx: '2',
                            borderRadius: '6px',
                            height: 'fit-content',
                            bgcolor: '#e7e7e7ff',
                            display: 'flex',
                            flexDirection: 'column',
                            gap: 1
                        }}>
                        <TextField
                            type="text"
                            size="small"
                            variant="outlined"
                            autoFocus
                            placeholder="Enter title columns"
                            value={newColumnTitle}
                            onChange={e => setNewColumnTitle(e.target.value)}
                            sx={{
                                width: '100%',
                                bgcolor: '#ffffff3d', // nền tối
                                borderRadius: '10px',
                                padding: 1,

                                '& .MuiOutlinedInput-root': {
                                    color: '#000000', // chữ trắng xám
                                    borderRadius: '10px',

                                    '& fieldset': {
                                        borderColor: '#60a5fa', // viền xanh nhạt
                                    },
                                    '&:hover fieldset': {
                                        borderColor: '#93c5fd',
                                    },
                                    '&.Mui-focused fieldset': {
                                        borderColor: '#3b82f6',
                                        borderWidth: '2px',
                                    },
                                },

                                '& .MuiInputBase-input': {
                                    padding: '10px 12px',
                                },

                                '& input::placeholder': {
                                    color: '#9ca3af',
                                    opacity: 1,
                                },
                            }}
                        />
                        <Box
                            sx={{
                                display: "flex",
                                alignItems: "center",
                                gap: 1,
                                padding: 1
                            }}
                        >
                            <Button
                                onClick={addNewColumn}
                                variant="contained"
                                sx={{
                                    textTransform: "none",
                                    backgroundColor: "#60a5fa",
                                    color: "#f3f3f3",
                                    borderRadius: "2px",
                                    px: 2,
                                    "&:hover": {
                                        backgroundColor: "#3b82f6",
                                    },
                                }}
                            >
                                Add New Column
                            </Button>

                            <IconButton
                                onClick={toggleOpenNewColumnForm}
                                sx={{
                                    color: "#4f8aff",
                                    "&:hover": {
                                        color:'white',
                                        backgroundColor: "#446499",
                                    },
                                }}
                            >
                                <ClearIcon />
                            </IconButton>
                        </Box>


                    </Box>
                }



            </Box>
        </DndContext>
    );
};

export default BoardContent;