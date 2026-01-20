import { Box } from "@mui/material";
import ListCard from "./Columns/ListCard/ListCard";
import HeaderCard from "./Columns/HeaderColumn";
import FooterCart from "./Columns/FooterColumn";
import { mapOrder } from '~/utils/sorts'
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { useState } from "react";
const ColumnBoard = (props) => {
    const [openNewFormAddCard, setOpenNewFormAddCard] = useState(false)
    const { column ,createNewCard,deleteColumn} = props
    const orderedColumns = mapOrder(column?.cards, column?.cardOrderIds, '_id')

    const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: column._id, data: { ...column } });

    const dndKitColumnStyles = {
        transform: CSS.Translate.toString(transform),
        height: '100%',
        transition,
        opacity: isDragging ? 0.5 : undefined,
        touchAction: 'none'
    };
    
     const newFormAddCard = () => {
    
        setOpenNewFormAddCard(!openNewFormAddCard)
    }
    return (
        <div ref={setNodeRef}
            style={dndKitColumnStyles}
            {...attributes}

        >
            <Box
                {...listeners}
                sx={{
                    minWidth: '300px',
                    maxWidth: '300px',
                    bgcolor: '#e7e7e7ff',
                    ml: '2',
                    borderRadius: '6px',
                    color: 'black',
                    height: 'fit-content',
                    flexShrink: 0
                }}>

                <HeaderCard columnHeader={column} deleteColumn={deleteColumn}/>
                <ListCard columnCart={orderedColumns} newFormAddCard={newFormAddCard} newAddCard= {openNewFormAddCard} createNewCard={createNewCard} column={column}/>
                <FooterCart newFormAddCard={newFormAddCard} newAddCard= {openNewFormAddCard} />

            </Box>
        </div>

    )
}
export default ColumnBoard;