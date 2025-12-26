import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import CardContent from '@mui/material/CardContent';
const CardBoad = () => {
    return (
        <Card sx={{ cursor: 'pointer', boxShadow: '0 1px 1px rgba(0,0,0,0.2)', overflow: 'unset' }}><CardContent sx={{ p: 1.5, '&:last-child': { p: 1.5 } }}><Typography>Cart 1</Typography></CardContent></Card>

    )
}
export default CardBoad;