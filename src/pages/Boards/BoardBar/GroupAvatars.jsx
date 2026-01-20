import Avatar from '@mui/material/Avatar';
import AvatarGroup from '@mui/material/AvatarGroup';

export default function GroupAvatars() {
  // Đặt kích thước mới cho avatar (bé hơn 20px)
  const tinySize = { width: 24, height: 24 }; 

  return (
    <AvatarGroup 
      max={4} 
      // Tùy chỉnh khoảng cách chồng lấn. Giá trị 'small' hoặc một giá trị pixel âm sẽ phù hợp với avatar nhỏ
      spacing={-6} // Ví dụ: Giảm khoảng cách chồng lấn để dễ nhìn hơn
      sx={{ 
          // Căn chỉnh vị trí của chữ "+x" khi max bị vượt quá
          '& .MuiAvatarGroup-avatar': {
              width: tinySize.width, 
              height: tinySize.height,
              fontSize: 10, // Làm bé cỡ chữ đếm số lượng (+1, +2,...)
          } 
      }}
    >
      <Avatar sx={tinySize} alt="Remy Sharp" src="#" />
      <Avatar sx={tinySize} alt="Travis Howard" src="#" />
      <Avatar sx={tinySize} alt="Cindy Baker" src="#" />
      <Avatar sx={tinySize} alt="Agnes Walker" src="#" />
      <Avatar sx={tinySize} alt="Trevor Henderson" src="#" />
    </AvatarGroup>
  );
}