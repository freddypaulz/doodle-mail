import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import Box from '@material-ui/core/Box';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import AdjustIcon from '@material-ui/icons/Adjust';
import {
   Button,
   DialogContent,
   DialogTitle,
   IconButton,
} from '@material-ui/core';
import Compose from '../Compose/Compose';
import Dialog from '@material-ui/core/Dialog';
import CloseIcon from '@material-ui/icons/Close';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
   root: {
      display: 'flex',
   },

   drawer: {
      width: drawerWidth,
      flexShrink: 0,
   },
   drawerPaper: {
      width: drawerWidth,
   },
   drawerContainer: {
      overflow: 'auto',
   },
   content: {
      flexGrow: 1,
      padding: theme.spacing(3),
   },
}));

export default function MenuDrawer(props) {
   const classes = useStyles();
   const [openCompose, setOpenCompose] = useState(false);
   const [inbox, setInbox] = useState(true);
   const [sent, setSent] = useState(false);
   const [drafts, setDrafts] = useState(false);

   return (
      <Box className={classes.root}>
         <Drawer
            className={classes.drawer}
            variant='permanent'
            classes={{
               paper: classes.drawerPaper,
            }}
         >
            <Toolbar />
            <Button
               size='small'
               style={{
                  color: 'white',
                  backgroundColor: '#3290F1',
                  margin: '30px',
               }}
               onClick={() => {
                  setOpenCompose(true);
               }}
            >
               Compose
            </Button>
            <Box className={classes.drawerContainer}>
               <List>
                  <ListItem
                     style={{
                        paddingLeft: '30px',
                        // backgroundColor: inbox ? '#f1f1f1' : 'white',
                        color: inbox ? '#3290F1' : 'black',
                     }}
                     button
                     key='Inbox'
                     selected={inbox}
                     onClick={() => {
                        setInbox(true);
                        setSent(false);
                        setDrafts(false);
                        props.inbox(false);
                     }}
                  >
                     <ListItemText primary='Inbox' />
                  </ListItem>
                  <ListItem
                     style={{
                        paddingLeft: '30px',
                        // backgroundColor: sent ? '#f1f1f1' : 'white',
                        color: sent ? '#3290F1' : 'black',
                     }}
                     button
                     selected={sent}
                     key='Sent mail'
                     onClick={() => {
                        setInbox(false);
                        setSent(true);
                        setDrafts(false);
                        props.sent(false);
                     }}
                  >
                     <ListItemText primary='Sent mail' />
                  </ListItem>
                  <ListItem
                     style={{
                        paddingLeft: '30px',
                        // backgroundColor: drafts ? '#f1f1f1' : 'white',
                        color: drafts ? '#3290F1' : 'black',
                     }}
                     button
                     key='Drafts'
                     selected={drafts}
                     onClick={() => {
                        setInbox(false);
                        setSent(false);
                        setDrafts(true);
                        props.drafts(false);
                     }}
                  >
                     <ListItemText primary='Drafts' />
                  </ListItem>

                  <ListItem
                     style={{ paddingLeft: '30px' }}
                     button
                     key='Starred'
                  >
                     <ListItemText primary='Starred' />
                  </ListItem>
               </List>
               <Divider />
               <List>
                  {['Friends', 'Family', 'Working', 'Clients', 'Urgent'].map(
                     (text, index) => (
                        <ListItem button key={text}>
                           <ListItemIcon>
                              {index % 2 === 0 ? (
                                 <AdjustIcon color='primary' />
                              ) : (
                                 <AdjustIcon color='error' />
                              )}
                           </ListItemIcon>
                           <ListItemText primary={text} />
                        </ListItem>
                     )
                  )}
               </List>
            </Box>
         </Drawer>
         <Dialog open={openCompose} maxWidth='md' fullWidth>
            <DialogTitle style={{ backgroundColor: '#3290F1' }}>
               <Box display='flex' alignItems='center' color='white'>
                  <Box style={{ width: '100%' }}>{props.title}</Box>
                  <Box>
                     <IconButton
                        aria-label='close'
                        className={classes.closeButton}
                        onClick={() => setOpenCompose(false)}
                     >
                        <CloseIcon style={{ color: 'white' }} />
                     </IconButton>
                  </Box>
               </Box>
            </DialogTitle>
            <DialogContent style={{ padding: '20px' }}>
               <Compose
                  close={(flag) => {
                     setOpenCompose(false);
                     if (flag) {
                        setInbox(false);
                        setSent(true);
                        setDrafts(false);
                        props.sent(true);
                     } else {
                        setInbox(false);
                        setSent(false);
                        setDrafts(true);
                        props.drafts(true);
                     }
                  }}
                  send={() => {
                     props.send();
                  }}
               />
            </DialogContent>
         </Dialog>
      </Box>
   );
}
