import { Box, Button, Tooltip } from "@mui/material";
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import AddCardIcon from '@mui/icons-material/AddCard';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import GroupIcon from '@mui/icons-material/Group';
import CommentIcon from '@mui/icons-material/Comment';
import AttachmentIcon from '@mui/icons-material/Attachment';
// import theme from "~/theme"; // Giữ nguyên cách import của bạn
import { DragHandle } from "@mui/icons-material";

const COLUMN_HEADER_HEIGHT = '50px';
const COLUMN_FOOTER_HEIGHT = '56px';

// Giá trị padding của BoardContent: 10px trên, 30px phải, 10px dưới (mặc định), 30px trái.
// Tổng padding dọc: 10px (trên) + 10px (dưới, nếu không khai báo) = 20px
const BOARD_CONTENT_PADDING_Y = '20px'; // Hoặc tính toán lại nếu bạn dùng '10px 30px' cho cả trên/dưới.
// Dựa trên padding: '10px 30px' -> padding-top: 10px, padding-bottom: 10px

const BoardContent = () => {
    return (
        // Board Content (Container chứa các cột)
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
            {/* Column (Cột danh sách) */}
            <Box sx={{
                minWidth: '300px',
                maxWidth: '300px',
                bgcolor: '#e7e7e7ff',
                // BỎ ml: '2' HOẶC GIỮ NGUYÊN (Nếu bạn muốn khoảng cách đầu tiên lớn hơn)
                ml: '2', // MUI spacing 2 = 16px. Giữ nguyên theo yêu cầu của bạn.

                borderRadius: '6px',
                color: 'black',
                height: 'fit-content',
                // --- BỔ SUNG: Cho phép cột không bị co lại khi thêm nhiều cột ---
                flexShrink: 0
            }}>

                {/* Column Header (p: 2 = 16px) */}
                <Box sx={{
                    height: COLUMN_HEADER_HEIGHT,
                    p: 2,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                }}>
                    <Typography variant="h6">Column Tittle</Typography>
                    <MoreHorizIcon sx={{ cursor: 'pointer' }} ></MoreHorizIcon>
                </Box>

                {/* Cards List (Khu vực cuộn) */}
                <Box sx={{
                    // Padding bạn đã đặt: p: 2 (16px trên, 16px phải, 16px dưới, 16px trái)
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 1,
                    overflowX: 'hidden',
                    overflowY: 'auto',

                    // --- SỬA LỖI TÍNH TOÁN MAX HEIGHT TẠI ĐÂY ---
                    // Công thức chuẩn: Chiều cao BoardContent - (Padding Y của BoardContent) - Chiều cao Header - Chiều cao Footer - (Padding Y của CardList)
                    // P: 2 (16px trên/dưới)
                    // Lưu ý: Nếu muốn Cards List không cuộn, bạn cần bỏ `p: 2` (padding trên/dưới)
                    // Nếu giữ p: 2, công thức phải là:
                    maxHeight: (theme) => `calc(${theme.trello.boardContentHeight} - 20px - ${COLUMN_HEADER_HEIGHT} - ${COLUMN_FOOTER_HEIGHT} - 32px)`,
                    // 20px = 10px (top padding BoardContent) + 10px (bottom padding BoardContent)
                    // 32px = 16px (top padding Cards List p:2) + 16px (bottom padding Cards List p:2)

                    // --- TÙY CHỈNH SCROLLBAR (Giữ nguyên) ---
                    '&::-webkit-scrollbar': { width: '8px' },
                    '&::-webkit-scrollbar-thumb': { backgroundColor: '#dcdcdc', borderRadius: '8px', border: '2px solid transparent' },
                    '&::-webkit-scrollbar-thumb:hover': { backgroundColor: '#a0a0a0' },
                    '&::-webkit-scrollbar-track': { backgroundColor: 'transparent' },

                }}>
                    {/* Các Card (Giữ nguyên) */}
                    <Card sx={{
                        cursor: 'pointer',
                        boxShadow: '0 1px 1px rgba(0,0,0,0.2)',
                        overflow: 'unset'
                    }}>
                        <CardMedia
                            sx={{ height: 140 }}
                            image="https://d1hjkbq40fs2x4.cloudfront.net/2017-08-21/files/landscape-photography_1645.jpg"
                            title="green iguana"
                        />
                        <CardContent sx={{ p: 1.5, '&:last-child': { p: 1.5 } }}>
                            <Typography >Cart Title</Typography>
                        </CardContent>
                        <CardActions>
                            <Button size="small" startIcon={<GroupIcon />}>20</Button>
                            <Button size="small" startIcon={<CommentIcon />}>15</Button>
                            <Button size="small" startIcon={<AttachmentIcon />}>10</Button>
                        </CardActions>
                    </Card>

                    {/* Các Card khác (Giữ nguyên) */}
                    <Card sx={{ cursor: 'pointer', boxShadow: '0 1px 1px rgba(0,0,0,0.2)', overflow: 'unset' }}><CardContent sx={{ p: 1.5, '&:last-child': { p: 1.5 } }}><Typography>Cart 1</Typography></CardContent></Card>
                    <Card sx={{ cursor: 'pointer', boxShadow: '0 1px 1px rgba(0,0,0,0.2)', overflow: 'unset' }}><CardContent sx={{ p: 1.5, '&:last-child': { p: 1.5 } }}><Typography>Cart 1</Typography></CardContent></Card>
                    <Card sx={{ cursor: 'pointer', boxShadow: '0 1px 1px rgba(0,0,0,0.2)', overflow: 'unset' }}><CardContent sx={{ p: 1.5, '&:last-child': { p: 1.5 } }}><Typography>Cart 1</Typography></CardContent></Card>
                    <Card sx={{ cursor: 'pointer', boxShadow: '0 1px 1px rgba(0,0,0,0.2)', overflow: 'unset' }}><CardContent sx={{ p: 1.5, '&:last-child': { p: 1.5 } }}><Typography>Cart 1</Typography></CardContent></Card>
                    <Card sx={{ cursor: 'pointer', boxShadow: '0 1px 1px rgba(0,0,0,0.2)', overflow: 'unset' }}><CardContent sx={{ p: 1.5, '&:last-child': { p: 1.5 } }}><Typography>Cart 1</Typography></CardContent></Card>
                    <Card sx={{ cursor: 'pointer', boxShadow: '0 1px 1px rgba(0,0,0,0.2)', overflow: 'unset' }}><CardContent sx={{ p: 1.5, '&:last-child': { p: 1.5 } }}><Typography>Cart 1</Typography></CardContent></Card>
                    <Card sx={{ cursor: 'pointer', boxShadow: '0 1px 1px rgba(0,0,0,0.2)', overflow: 'unset' }}><CardContent sx={{ p: 1.5, '&:last-child': { p: 1.5 } }}><Typography>Cart 1</Typography></CardContent></Card>
                    <Card sx={{ cursor: 'pointer', boxShadow: '0 1px 1px rgba(0,0,0,0.2)', overflow: 'unset' }}><CardContent sx={{ p: 1.5, '&:last-child': { p: 1.5 } }}><Typography>Cart 1</Typography></CardContent></Card>
                    <Card sx={{ cursor: 'pointer', boxShadow: '0 1px 1px rgba(0,0,0,0.2)', overflow: 'unset' }}><CardContent sx={{ p: 1.5, '&:last-child': { p: 1.5 } }}><Typography>Cart 1</Typography></CardContent></Card>
                    <Card sx={{ cursor: 'pointer', boxShadow: '0 1px 1px rgba(0,0,0,0.2)', overflow: 'unset' }}><CardContent sx={{ p: 1.5, '&:last-child': { p: 1.5 } }}><Typography>Cart 1</Typography></CardContent></Card>

                </Box>

                {/* Column Footer (p: 2 = 16px) */}
                <Box sx={{
                    height: COLUMN_FOOTER_HEIGHT,
                    p: 2,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                }}>
                    <Button startIcon={<AddCardIcon />}>Add new card</Button>
                    <Tooltip title="Drap to move">
                        <DragHandle sx={{ cursor: 'pointer' }}></DragHandle>
                    </Tooltip>
                </Box>
            </Box>

            <Box sx={{
                minWidth: '300px',
                maxWidth: '300px',
                bgcolor: '#e7e7e7ff',
                // BỎ ml: '2' HOẶC GIỮ NGUYÊN (Nếu bạn muốn khoảng cách đầu tiên lớn hơn)
                ml: '2', // MUI spacing 2 = 16px. Giữ nguyên theo yêu cầu của bạn.

                borderRadius: '6px',
                color: 'black',
                height: 'fit-content',
                // --- BỔ SUNG: Cho phép cột không bị co lại khi thêm nhiều cột ---
                flexShrink: 0
            }}>

                {/* Column Header (p: 2 = 16px) */}
                <Box sx={{
                    height: COLUMN_HEADER_HEIGHT,
                    p: 2,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                }}>
                    <Typography variant="h6">Column Tittle</Typography>
                    <MoreHorizIcon sx={{ cursor: 'pointer' }} ></MoreHorizIcon>
                </Box>

                {/* Cards List (Khu vực cuộn) */}
                <Box sx={{
                    // Padding bạn đã đặt: p: 2 (16px trên, 16px phải, 16px dưới, 16px trái)
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 1,
                    overflowX: 'hidden',
                    overflowY: 'auto',

                    // --- SỬA LỖI TÍNH TOÁN MAX HEIGHT TẠI ĐÂY ---
                    // Công thức chuẩn: Chiều cao BoardContent - (Padding Y của BoardContent) - Chiều cao Header - Chiều cao Footer - (Padding Y của CardList)
                    // P: 2 (16px trên/dưới)
                    // Lưu ý: Nếu muốn Cards List không cuộn, bạn cần bỏ `p: 2` (padding trên/dưới)
                    // Nếu giữ p: 2, công thức phải là:
                    maxHeight: (theme) => `calc(${theme.trello.boardContentHeight} - 20px - ${COLUMN_HEADER_HEIGHT} - ${COLUMN_FOOTER_HEIGHT} - 32px)`,
                    // 20px = 10px (top padding BoardContent) + 10px (bottom padding BoardContent)
                    // 32px = 16px (top padding Cards List p:2) + 16px (bottom padding Cards List p:2)

                    // --- TÙY CHỈNH SCROLLBAR (Giữ nguyên) ---
                    '&::-webkit-scrollbar': { width: '8px' },
                    '&::-webkit-scrollbar-thumb': { backgroundColor: '#dcdcdc', borderRadius: '8px', border: '2px solid transparent' },
                    '&::-webkit-scrollbar-thumb:hover': { backgroundColor: '#a0a0a0' },
                    '&::-webkit-scrollbar-track': { backgroundColor: 'transparent' },

                }}>


                    <Card sx={{ cursor: 'pointer', boxShadow: '0 1px 1px rgba(0,0,0,0.2)', overflow: 'unset' }}><CardContent sx={{ p: 1.5, '&:last-child': { p: 1.5 } }}><Typography>Cart 1</Typography></CardContent></Card>
                    <Card sx={{ cursor: 'pointer', boxShadow: '0 1px 1px rgba(0,0,0,0.2)', overflow: 'unset' }}><CardContent sx={{ p: 1.5, '&:last-child': { p: 1.5 } }}><Typography>Cart 1</Typography></CardContent></Card>

                </Box>

                {/* Column Footer (p: 2 = 16px) */}
                <Box sx={{
                    height: COLUMN_FOOTER_HEIGHT,
                    p: 2,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                }}>
                    <Button startIcon={<AddCardIcon />}>Add new card</Button>
                    <Tooltip title="Drap to move">
                        <DragHandle sx={{ cursor: 'pointer' }}></DragHandle>
                    </Tooltip>
                </Box>
            </Box>

            <Box sx={{
                minWidth: '300px',
                maxWidth: '300px',
                bgcolor: '#e7e7e7ff',
                // BỎ ml: '2' HOẶC GIỮ NGUYÊN (Nếu bạn muốn khoảng cách đầu tiên lớn hơn)
                ml: '2', // MUI spacing 2 = 16px. Giữ nguyên theo yêu cầu của bạn.

                borderRadius: '6px',
                color: 'black',
                height: 'fit-content',
                // --- BỔ SUNG: Cho phép cột không bị co lại khi thêm nhiều cột ---
                flexShrink: 0
            }}>

                {/* Column Header (p: 2 = 16px) */}
                <Box sx={{
                    height: COLUMN_HEADER_HEIGHT,
                    p: 2,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                }}>
                    <Typography variant="h6">Column Tittle</Typography>
                    <MoreHorizIcon sx={{ cursor: 'pointer' }} ></MoreHorizIcon>
                </Box>

                {/* Cards List (Khu vực cuộn) */}
                <Box sx={{
                    // Padding bạn đã đặt: p: 2 (16px trên, 16px phải, 16px dưới, 16px trái)
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 1,
                    overflowX: 'hidden',
                    overflowY: 'auto',

                    // --- SỬA LỖI TÍNH TOÁN MAX HEIGHT TẠI ĐÂY ---
                    // Công thức chuẩn: Chiều cao BoardContent - (Padding Y của BoardContent) - Chiều cao Header - Chiều cao Footer - (Padding Y của CardList)
                    // P: 2 (16px trên/dưới)
                    // Lưu ý: Nếu muốn Cards List không cuộn, bạn cần bỏ `p: 2` (padding trên/dưới)
                    // Nếu giữ p: 2, công thức phải là:
                    maxHeight: (theme) => `calc(${theme.trello.boardContentHeight} - 20px - ${COLUMN_HEADER_HEIGHT} - ${COLUMN_FOOTER_HEIGHT} - 32px)`,
                    // 20px = 10px (top padding BoardContent) + 10px (bottom padding BoardContent)
                    // 32px = 16px (top padding Cards List p:2) + 16px (bottom padding Cards List p:2)

                    // --- TÙY CHỈNH SCROLLBAR (Giữ nguyên) ---
                    '&::-webkit-scrollbar': { width: '8px' },
                    '&::-webkit-scrollbar-thumb': { backgroundColor: '#dcdcdc', borderRadius: '8px', border: '2px solid transparent' },
                    '&::-webkit-scrollbar-thumb:hover': { backgroundColor: '#a0a0a0' },
                    '&::-webkit-scrollbar-track': { backgroundColor: 'transparent' },

                }}>
                    <Card sx={{
                        cursor: 'pointer',
                        boxShadow: '0 1px 1px rgba(0,0,0,0.2)',
                        overflow: 'unset'
                    }}>
                        <CardMedia
                            sx={{ height: 140 }}
                            image="https://d1hjkbq40fs2x4.cloudfront.net/2017-08-21/files/landscape-photography_1645.jpg"
                            title="green iguana"
                        />
                        <CardContent sx={{ p: 1.5, '&:last-child': { p: 1.5 } }}>
                            <Typography >Cart Title</Typography>
                        </CardContent>
                        <CardActions>
                            <Button size="small" startIcon={<GroupIcon />}>20</Button>
                            <Button size="small" startIcon={<CommentIcon />}>15</Button>
                            <Button size="small" startIcon={<AttachmentIcon />}>10</Button>
                        </CardActions>
                    </Card>

                    <Card sx={{ cursor: 'pointer', boxShadow: '0 1px 1px rgba(0,0,0,0.2)', overflow: 'unset' }}><CardContent sx={{ p: 1.5, '&:last-child': { p: 1.5 } }}><Typography>Cart 1</Typography></CardContent></Card>
                    <Card sx={{ cursor: 'pointer', boxShadow: '0 1px 1px rgba(0,0,0,0.2)', overflow: 'unset' }}><CardContent sx={{ p: 1.5, '&:last-child': { p: 1.5 } }}><Typography>Cart 1</Typography></CardContent></Card>

                </Box>

                {/* Column Footer (p: 2 = 16px) */}
                <Box sx={{
                    height: COLUMN_FOOTER_HEIGHT,
                    p: 2,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                }}>
                    <Button startIcon={<AddCardIcon />}>Add new card</Button>
                    <Tooltip title="Drap to move">
                        <DragHandle sx={{ cursor: 'pointer' }}></DragHandle>
                    </Tooltip>
                </Box>
            </Box>

            <Box sx={{
                minWidth: '300px',
                maxWidth: '300px',
                bgcolor: '#e7e7e7ff',
                // BỎ ml: '2' HOẶC GIỮ NGUYÊN (Nếu bạn muốn khoảng cách đầu tiên lớn hơn)
                ml: '2', // MUI spacing 2 = 16px. Giữ nguyên theo yêu cầu của bạn.

                borderRadius: '6px',
                color: 'black',
                height: 'fit-content',
                // --- BỔ SUNG: Cho phép cột không bị co lại khi thêm nhiều cột ---
                flexShrink: 0
            }}>

                {/* Column Header (p: 2 = 16px) */}
                <Box sx={{
                    height: COLUMN_HEADER_HEIGHT,
                    p: 2,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                }}>
                    <Typography variant="h6">Column Tittle</Typography>
                    <MoreHorizIcon sx={{ cursor: 'pointer' }} ></MoreHorizIcon>
                </Box>

                {/* Cards List (Khu vực cuộn) */}
                <Box sx={{
                    // Padding bạn đã đặt: p: 2 (16px trên, 16px phải, 16px dưới, 16px trái)
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 1,
                    overflowX: 'hidden',
                    overflowY: 'auto',

                    // --- SỬA LỖI TÍNH TOÁN MAX HEIGHT TẠI ĐÂY ---
                    // Công thức chuẩn: Chiều cao BoardContent - (Padding Y của BoardContent) - Chiều cao Header - Chiều cao Footer - (Padding Y của CardList)
                    // P: 2 (16px trên/dưới)
                    // Lưu ý: Nếu muốn Cards List không cuộn, bạn cần bỏ `p: 2` (padding trên/dưới)
                    // Nếu giữ p: 2, công thức phải là:
                    maxHeight: (theme) => `calc(${theme.trello.boardContentHeight} - 20px - ${COLUMN_HEADER_HEIGHT} - ${COLUMN_FOOTER_HEIGHT} - 32px)`,
                    // 20px = 10px (top padding BoardContent) + 10px (bottom padding BoardContent)
                    // 32px = 16px (top padding Cards List p:2) + 16px (bottom padding Cards List p:2)

                    // --- TÙY CHỈNH SCROLLBAR (Giữ nguyên) ---
                    '&::-webkit-scrollbar': { width: '8px' },
                    '&::-webkit-scrollbar-thumb': { backgroundColor: '#dcdcdc', borderRadius: '8px', border: '2px solid transparent' },
                    '&::-webkit-scrollbar-thumb:hover': { backgroundColor: '#a0a0a0' },
                    '&::-webkit-scrollbar-track': { backgroundColor: 'transparent' },

                }}>


                    <Card sx={{ cursor: 'pointer', boxShadow: '0 1px 1px rgba(0,0,0,0.2)', overflow: 'unset' }}><CardContent sx={{ p: 1.5, '&:last-child': { p: 1.5 } }}><Typography>Cart 1</Typography></CardContent></Card>
                    <Card sx={{ cursor: 'pointer', boxShadow: '0 1px 1px rgba(0,0,0,0.2)', overflow: 'unset' }}><CardContent sx={{ p: 1.5, '&:last-child': { p: 1.5 } }}><Typography>Cart 1</Typography></CardContent></Card>

                </Box>

                {/* Column Footer (p: 2 = 16px) */}
                <Box sx={{
                    height: COLUMN_FOOTER_HEIGHT,
                    p: 2,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                }}>
                    <Button startIcon={<AddCardIcon />}>Add new card</Button>
                    <Tooltip title="Drap to move">
                        <DragHandle sx={{ cursor: 'pointer' }}></DragHandle>
                    </Tooltip>
                </Box>

            </Box>

            <Box sx={{
                minWidth: '300px',
                maxWidth: '300px',
                bgcolor: '#e7e7e7ff',
                // BỎ ml: '2' HOẶC GIỮ NGUYÊN (Nếu bạn muốn khoảng cách đầu tiên lớn hơn)
                ml: '2', // MUI spacing 2 = 16px. Giữ nguyên theo yêu cầu của bạn.

                borderRadius: '6px',
                color: 'black',
                height: 'fit-content',
                // --- BỔ SUNG: Cho phép cột không bị co lại khi thêm nhiều cột ---
                flexShrink: 0
            }}>

                {/* Column Header (p: 2 = 16px) */}
                <Box sx={{
                    height: COLUMN_HEADER_HEIGHT,
                    p: 2,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                }}>
                    <Typography variant="h6">Column Tittle</Typography>
                    <MoreHorizIcon sx={{ cursor: 'pointer' }} ></MoreHorizIcon>
                </Box>

                {/* Cards List (Khu vực cuộn) */}
                <Box sx={{
                    // Padding bạn đã đặt: p: 2 (16px trên, 16px phải, 16px dưới, 16px trái)
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 1,
                    overflowX: 'hidden',
                    overflowY: 'auto',

                    // --- SỬA LỖI TÍNH TOÁN MAX HEIGHT TẠI ĐÂY ---
                    // Công thức chuẩn: Chiều cao BoardContent - (Padding Y của BoardContent) - Chiều cao Header - Chiều cao Footer - (Padding Y của CardList)
                    // P: 2 (16px trên/dưới)
                    // Lưu ý: Nếu muốn Cards List không cuộn, bạn cần bỏ `p: 2` (padding trên/dưới)
                    // Nếu giữ p: 2, công thức phải là:
                    maxHeight: (theme) => `calc(${theme.trello.boardContentHeight} - 20px - ${COLUMN_HEADER_HEIGHT} - ${COLUMN_FOOTER_HEIGHT} - 32px)`,
                    // 20px = 10px (top padding BoardContent) + 10px (bottom padding BoardContent)
                    // 32px = 16px (top padding Cards List p:2) + 16px (bottom padding Cards List p:2)

                    // --- TÙY CHỈNH SCROLLBAR (Giữ nguyên) ---
                    '&::-webkit-scrollbar': { width: '8px' },
                    '&::-webkit-scrollbar-thumb': { backgroundColor: '#dcdcdc', borderRadius: '8px', border: '2px solid transparent' },
                    '&::-webkit-scrollbar-thumb:hover': { backgroundColor: '#a0a0a0' },
                    '&::-webkit-scrollbar-track': { backgroundColor: 'transparent' },

                }}>


                    <Card sx={{ cursor: 'pointer', boxShadow: '0 1px 1px rgba(0,0,0,0.2)', overflow: 'unset' }}><CardContent sx={{ p: 1.5, '&:last-child': { p: 1.5 } }}><Typography>Cart 1</Typography></CardContent></Card>
                    <Card sx={{ cursor: 'pointer', boxShadow: '0 1px 1px rgba(0,0,0,0.2)', overflow: 'unset' }}><CardContent sx={{ p: 1.5, '&:last-child': { p: 1.5 } }}><Typography>Cart 1</Typography></CardContent></Card>

                </Box>

                {/* Column Footer (p: 2 = 16px) */}
                <Box sx={{
                    height: COLUMN_FOOTER_HEIGHT,
                    p: 2,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                }}>
                    <Button startIcon={<AddCardIcon />}>Add new card</Button>
                    <Tooltip title="Drap to move">
                        <DragHandle sx={{ cursor: 'pointer' }}></DragHandle>
                    </Tooltip>
                </Box>
            </Box>
        </Box>
    );
};

export default BoardContent;