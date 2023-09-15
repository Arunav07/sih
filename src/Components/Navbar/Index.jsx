import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import { AppBar, Toolbar, Typography, InputBase, IconButton, Drawer, List, ListItemButton, ListItemText, Link } from '@mui/material';
import { Search as SearchIcon, Menu as MenuIcon } from '@mui/icons-material';
import MenuItem from '@mui/material/MenuItem';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
}));

const SidebarList = styled(List)(({ theme }) => ({
  width: 250, // Adjust the width of the sidebar as needed
  [theme.breakpoints.up('sm')]: {
    width: 300,
  },
}));

const AppContainer = styled('div')({
  display: 'flex',
});

export default function SearchAppBar() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [isMobileDrawerOpen, setIsMobileDrawerOpen] = React.useState(false);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleMobileMenuOpen = () => {
    setIsMobileDrawerOpen(true);
  };

  const handleMobileMenuClose = () => {
    setIsMobileDrawerOpen(false);
  };

  return (
    <AppContainer>
      <AppBar position="fixed" sx={{ backgroundColor: 'gray' }}>
        <Toolbar>
          {/* Show the MenuIcon only on mobile */}
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            sx={{ mr: 2, display: { sm: 'none' } }}
            onClick={handleMobileMenuOpen}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, textAlign: "left", marginLeft: "4vw"}}
          >
            Chanakya
          </Typography>
          {/* Show the MenuItem links only on larger screens */}
          <MenuItem onClick={handleClick} sx={{ display: { xs: 'none', sm: 'block' } }}>
<Link href="#" color="inherit" underline='none' sx={{ '&:hover': { color: '#FAFAF0' } }}>

              <ListItemText primary="Services we offer" />
            </Link>
          </MenuItem>
          <MenuItem onClick={handleClick} sx={{ display: { xs: 'none', sm: 'block' } }}>
<Link href="#" color="inherit" underline='none' sx={{ '&:hover': { color: '#FAFAF0' } }}>

              <ListItemText primary="Different sections of Law" />
            </Link>
          </MenuItem>
          <MenuItem onClick={handleClick} sx={{ display: { xs: 'none', sm: 'block' } }}>
<Link href="#" color="inherit" underline='none' sx={{ '&:hover': { color: '#FAFAF0' } }}>

              <ListItemText primary="FaQs" />
            </Link>
          </MenuItem>
          <MenuItem onClick={handleClick} sx={{ display: { xs: 'none', sm: 'block' } }}>
<Link href="#" color="inherit" underline='none' sx={{ '&:hover': { color: '#FAFAF0' } }}>

              <ListItemText primary="About the Platform" />
            </Link>
          </MenuItem>
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ 'aria-label': 'search' }}
            />
          </Search>
        </Toolbar>
      </AppBar>
      <Drawer
        anchor="left"
        open={isMobileDrawerOpen}
        onClose={handleMobileMenuClose}
      >
        <SidebarList>
          <ListItemButton onClick={handleClick}>
<Link href="#" color="inherit" underline='none' sx={{ '&:hover': { color: '#FAFAF0' } }}>

              <ListItemText primary="Services we offer" />
            </Link>
          </ListItemButton>
          <ListItemButton onClick={handleClick}>
<Link href="#" color="inherit" underline='none' sx={{ '&:hover': { color: '#FAFAF0' } }}>

              <ListItemText primary="Different sections of Law" />
            </Link>
          </ListItemButton>
          <ListItemButton onClick={handleClick}>
<Link href="#" color="inherit" underline='none' sx={{ '&:hover': { color: '#FAFAF0' } }}>

              <ListItemText primary="FaQs" />
            </Link>
          </ListItemButton>
          <ListItemButton onClick={handleClick}>
<Link href="#" color="inherit" underline='none' sx={{ '&:hover': { color: '#FAFAF0' } }}>

              <ListItemText primary="About the Platform" />
            </Link>
          </ListItemButton>
        </SidebarList>
      </Drawer>
      {/* Rest of your content */}
    </AppContainer>
  );
}
