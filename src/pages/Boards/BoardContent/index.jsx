import { Box, Button } from "@mui/material";
import ColumnBoard from "./ListColumns/ColumnBoard";
import LibraryAddIcon from '@mui/icons-material/LibraryAdd';
import { mapOrder } from '~/utils/sorts'
import { DndContext, PointerSensor, useSensor, useSensors, MouseSensor, TouchSensor } from "@dnd-kit/core";
import { arrayMove, horizontalListSortingStrategy, SortableContext } from "@dnd-kit/sortable";
import { useEffect, useState } from "react";

const BOARD_CONTENT_PADDING_Y = '20px';

const BoardContent = (props) => {
    // const pointerSensor = useSensor(PointerSensor, { activationConstraint: { distance: 10 } })
    const mountSensor = useSensor(MouseSensor, { activationConstraint: { distance: 10 } })
    const touchSensor = useSensor(TouchSensor, { activationConstraint: { delay: 250, tolerance:5 } })

    // const sensors = useSensors(pointerSensor)
       const sensors = useSensors(mountSensor,touchSensor)

    const { board } = props;
    const [orderedColumns, setOrderedColumns] = useState([]);
    useEffect(() => {
        setOrderedColumns(mapOrder(board?.columns, board?.columnOrderIds, '_id'))
    }, [board])
    const handelDragEnd = (e) => {
        console.log('Drag:', e);

        const { active, over } = e
        if (!over) {
            return
        }
        if (active.id !== over.id) {
            const oldIndex = orderedColumns.findIndex(c => c._id === active.id)
            const NewIndex = orderedColumns.findIndex(c => c._id === over.id)
            const dndOrderedColumns = arrayMove(orderedColumns, oldIndex, NewIndex)
            const dndOrderedColumnsIds = dndOrderedColumns.map(c => c._id);
            setOrderedColumns(dndOrderedColumns)
        }


    }
    return (
        <DndContext onDragEnd={handelDragEnd} sensors={sensors}>
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