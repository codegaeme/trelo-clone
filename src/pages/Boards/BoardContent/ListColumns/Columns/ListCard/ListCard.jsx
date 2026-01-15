import { Box, Button } from "@mui/material";
import CardFul from "./Card/CardFul";
import { verticalListSortingStrategy, SortableContext } from "@dnd-kit/sortable";
import { IconButton, TextField } from "@mui/material";
import ClearIcon from '@mui/icons-material/Clear';
import { useState } from "react";
import { toast } from "react-toastify";
const ListCard = (props) => {

    const { columnCart, newAddCard, newFormAddCard } = props

    const [newCardTitle, setNewCardTitle] = useState("")

    const addNewCard = () => {
        if (!newCardTitle) {
            toast.error("Please enter title cards")
            return
        }

        setNewCardTitle("")
        newFormAddCard(false)


    }


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

                {newAddCard &&
                    <Box

                        sx={{
                            minWidth: '260px',
                            maxWidth: '260px',
                            mx: '2',
                            borderRadius: '6px',
                            height: 'fit-content',
                            bgcolor: 'rgb(255, 255, 255)',
                            display: 'flex',
                            flexDirection: 'column',
                            gap: 1,
                            padding: 1,
                            alignSelf: 'flex-start',

                        }}>
                        <TextField
                            type="text"
                            size="small"
                            variant="outlined"
                            autoFocus
                            placeholder="Enter title card"
                            value={newCardTitle}
                            onChange={e => setNewCardTitle(e.target.value)}
                            data-no-dnd='true'
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
                                onClick={addNewCard}
                                variant="contained"
                                data-no-dnd='true'
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
                                Add New Card
                            </Button>

                            <IconButton
                                onClick={newFormAddCard}
                                sx={{
                                    color: "#0a5bfe",
                                    "&:hover": {
                                        color: "#ffffff",
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
        </SortableContext>
    )

}
export default ListCard