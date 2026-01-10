import { Box } from "@mui/material";
import CardFul from "./Card/CardFul";
import { verticalListSortingStrategy, SortableContext } from "@dnd-kit/sortable";
const ListCard = ({ columnCart }) => {


    return (
        <SortableContext items={columnCart?.map(c => c._id)} strategy={verticalListSortingStrategy}>
            <Box sx={{

                p: 2,
                display: 'flex',
                flexDirection: 'column',
                gap: 1,
                overflowX: 'hidden',
                overflowY: 'auto',


                maxHeight: (theme) => `calc(${theme.trello.boardContentHeight} - 20px - ${theme.trello.columnHeaderHeight} - ${theme.trello.columnFooterHeight} - 32px)`,


                '&::-webkit-scrollbar': { width: '8px' },
                '&::-webkit-scrollbar-thumb': { backgroundColor: '#dcdcdc', borderRadius: '8px', border: '2px solid transparent' },
                '&::-webkit-scrollbar-thumb:hover': { backgroundColor: '#a0a0a0' },
                '&::-webkit-scrollbar-track': { backgroundColor: 'transparent' },

            }}>

                {columnCart?.map((card) => <CardFul key={card._id} card={card} />)}



                {/* Các Card khác (Giữ nguyên) */}
            </Box>
        </SortableContext>
    )

}
export default ListCard