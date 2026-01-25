import * as React from 'react';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';

function SearchBar() {

  const lightTextAndBorder = '#D0D0D0';
  const inputBackground = (theme) => theme.trello.colorAppBar;


  return (
    <>

      {/* 1. Ô Tìm Kiếm (TextField) */}
      <TextField
        id="standalone-search"
        placeholder="Tìm kiếm"
        type="search"
        size='small'
        variant='outlined'


        sx={{
          width: {
            xs: '150px', // Nhỏ lại trên mobile
            sm: '200px', // Vừa trên tablet
            md: '800px'  // To trên desktop
          },
          // Tùy chỉnh màu sắc
          '& .MuiOutlinedInput-root': {
            backgroundColor: inputBackground,
            borderRadius: 1,
            // Viền mặc định
            '& fieldset': {
              borderColor: lightTextAndBorder,
            },
            // Viền khi hover
            '&:hover fieldset': {
              borderColor: lightTextAndBorder,
            },
            // Viền khi focus (Màu viền sáng hơn khi người dùng click vào)
            '&.Mui-focused fieldset': {
              borderColor: '#88C0F4',
            },
          },
          // Màu chữ và Placeholder
          '& .MuiInputBase-input, & .MuiInputBase-input::placeholder': {
            color: lightTextAndBorder,
          },

        }}

        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              {/* Icon Tìm kiếm */}
              <SearchIcon sx={{ color: lightTextAndBorder }} />
            </InputAdornment>
          ),

        }}
      />
    </>
  );
}

export default SearchBar;