import { Box } from "@mui/material";
import ListCard from "./Columns/ListCard/ListCard";
import HeaderCard from "./Columns/HeaderColumn";
import FooterCart from "./Columns/FooterColumn";
import { mapOrder } from '~/utils/sorts'
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
const ColumnBoard = (props) => {
    const { column } = props
    const orderedColumns = mapOrder(column?.cards, column?.cardOrderIds, '_id')

    const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: column._id, data: { ...column } });

    const dndKitColumnStyles = {
        transform: CSS.Translate.toString(transform),
        transition,
        opacity: isDragging ? 0.5 : 1,
        touchAction:'none'
    };
    return (
        <Box
            ref={setNodeRef}
            style={dndKitColumnStyles}
            {...attributes}
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

            <HeaderCard columnHeader={column} />
            <ListCard columnCart={orderedColumns} />
            <FooterCart />

        </Box>
    )
}
export default ColumnBoard;