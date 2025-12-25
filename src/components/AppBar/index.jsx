import { Box, Tooltip, Typography } from '@mui/material'
import TrelloIcon from '~/assets/logo.svg?react'
import SvgIcon from '@mui/material/SvgIcon';
import AccountMenu from './Menus/AccountMenu';
import SearchBar from './SeachBar';
import Helps from './Menus/Help';
import Notification from './Menus/Notification';
import theme from '~/theme';
const Appbar = () => {
    return (
        <Box px={2} sx={{
            backgroundColor: (theme) => theme.trello.colorAppBar,
            width: '100%',
            height: (theme) => theme.trello.appBarHeight,
            display: 'flex',
            alignItems: 'center',
            color: '#fff'
        }}>

            {/* Box cha: Thêm width: 100% và justifyContent: space-between */}
            <Box sx={{
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
            }}>


                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>

                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                        <SvgIcon
                            component={TrelloIcon}
                            inheritViewBox
                            sx={{ color: 'white' }}
                        />
                        <Typography
                            variant="h6"
                            sx={{
                                fontSize: '1.2rem',
                                fontWeight: 'bold',
                                color: 'white',
                                mr: 1
                            }}
                        >
                            Trello
                        </Typography>


                    </Box>
                </Box>
                <Box display={'flex'} alignItems={'center'} minWidth={'800px'}>
                    <SearchBar></SearchBar>
                </Box>


                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, padding: 3 }}>
                    <Helps/>
                    <Notification/>
                    <AccountMenu color='primary.main' ></AccountMenu>
                </Box>

            </Box>

        </Box>
    )
}
export default Appbar;