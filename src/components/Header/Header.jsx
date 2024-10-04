import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { useRouter } from 'next/router'

export default function Header() {

  const router = useRouter()
  const goHome = () => {
    router.push('/');
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Button onClick={goHome} color="inherit">Home</Button>
        </Toolbar>
         <h1 style={{textAlign: 'center', marginTop: '-55px'}}>
          Twin Digital Platform
        </h1>
      </AppBar>
    </Box>
  );
}
