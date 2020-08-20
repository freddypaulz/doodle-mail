import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Box from '@material-ui/core/Box';
import IconButton from '@material-ui/core/IconButton';
import AppsIcon from '@material-ui/icons/Apps';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Fade from '@material-ui/core/Fade';
import AccountCircleOutlinedIcon from '@material-ui/icons/AccountCircleOutlined';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import T from './T.png';
import { TextField, InputAdornment } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import ModeCommentIcon from '@material-ui/icons/ModeComment';
import NotificationsIcon from '@material-ui/icons/Notifications';
const useStyles = makeStyles((theme) => ({
   root: {
      flexGrow: 1,
   },
   menuButton: {
      marginRight: '25vw',
   },
   appBar: {
      zIndex: theme.zIndex.drawer + 1,
   },
}));

export default function ButtonAppBar(props) {
   const [anchorEl, setAnchorE1] = useState(null);
   const [user, setUser] = useState(JSON.parse(sessionStorage.getItem('user')));
   const classes = useStyles();
   return (
      <Box className={classes.root}>
         <AppBar
            position='fixed'
            style={{ backgroundColor: 'white', color: 'black' }}
            className={classes.appBar}
         >
            <Toolbar>
               <IconButton
                  edge='start'
                  color='inherit'
                  aria-label='menu'
                  className={classes.menuButton}
                  onClick={() => {}}
               >
                  <img
                     src={T}
                     alt='Logo'
                     style={{
                        width: '40px',
                        height: '40px',
                        padding: '5px',
                     }}
                  />
               </IconButton>
               <TextField
                  size='small'
                  variant='outlined'
                  label='search'
                  style={{ width: '40vw', marginRight: '20vw' }}
                  InputProps={{
                     endAdornment: (
                        <InputAdornment position='end'>
                           <SearchIcon style={{ color: '#3290F1' }} />
                        </InputAdornment>
                     ),
                  }}
               />
               <IconButton
                  edge='start'
                  color='inherit'
                  aria-label='menu'
                  onClick={() => {}}
               >
                  <ModeCommentIcon style={{ fontSize: '20px' }} />
               </IconButton>
               <IconButton
                  edge='start'
                  color='inherit'
                  aria-label='menu'
                  onClick={() => {}}
               >
                  <AppsIcon style={{ fontSize: '20px' }} />
               </IconButton>
               <IconButton
                  edge='start'
                  color='inherit'
                  aria-label='menu'
                  onClick={() => {}}
               >
                  <NotificationsIcon style={{ fontSize: '20px' }} />
               </IconButton>
               <IconButton
                  edge='start'
                  color='inherit'
                  aria-label='menu'
                  onClick={(event) => {
                     var temp = JSON.parse(sessionStorage.getItem('user'));
                     setUser(temp.first_name);
                     setAnchorE1(event.currentTarget);
                  }}
               >
                  <AccountCircleOutlinedIcon style={{ fontSize: '30px' }} />
               </IconButton>

               <Menu
                  style={{ marginTop: '40px' }}
                  id='user-menu'
                  anchorEl={anchorEl}
                  keepMounted
                  open={Boolean(anchorEl)}
                  TransitionComponent={Fade}
                  onClose={() => {
                     setAnchorE1(null);
                  }}
               >
                  {/* <MenuItem
                     style={{
                        display: 'flex',
                        letterSpacing: '5px',
                        justifyContent: 'center',
                        textTransform: 'uppercase',
                     }}
                  >
                     
                     {JSON.parse(sessionStorage.getItem('user')).first_name}
                  </MenuItem> */}
                  {JSON.parse(sessionStorage.getItem('users')).length > 0
                     ? JSON.parse(sessionStorage.getItem('users')).map(
                          (e, index) => {
                             return (
                                <MenuItem
                                   key={index}
                                   style={{
                                      display: 'flex',
                                      letterSpacing: '5px',
                                      justifyContent: 'center',
                                      textTransform: 'uppercase',
                                      backgroundColor:
                                         e.user_name ===
                                         JSON.parse(
                                            sessionStorage.getItem('user')
                                         ).user_name
                                            ? '#F1F1F1'
                                            : 'white',
                                      color:
                                         e.user_name ===
                                         JSON.parse(
                                            sessionStorage.getItem('user')
                                         ).user_name
                                            ? '#5B87F0'
                                            : 'black',
                                   }}
                                   onClick={() => {
                                      sessionStorage.setItem(
                                         'user',
                                         JSON.stringify(e)
                                      );
                                      setUser(e);
                                      if (props.inboxSel) {
                                         props.inbox();
                                      } else if (props.sentSel) {
                                         props.sent();
                                      } else {
                                         props.drafts();
                                      }
                                   }}
                                >
                                   {e.first_name}
                                </MenuItem>
                             );
                          }
                       )
                     : null}
                  <MenuItem
                     onClick={props.logout}
                     style={{
                        display: 'flex',
                        justifyContent: 'flex-start',
                     }}
                  >
                     <ExitToAppIcon
                        style={{
                           fontSize: '20px',
                           paddingRight: '5px',
                        }}
                     />
                     Sign out
                  </MenuItem>
                  <MenuItem
                     onClick={() => {
                        props.prop.history.push('/');
                     }}
                     style={{
                        display: 'flex',
                        justifyContent: 'flex-start',
                     }}
                  >
                     <ExitToAppIcon
                        style={{
                           fontSize: '20px',
                           paddingRight: '5px',
                        }}
                     />
                     Add Account
                  </MenuItem>
               </Menu>
            </Toolbar>
         </AppBar>
      </Box>
   );
}
