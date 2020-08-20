import React from 'react';
import {
   Box,
   Tab,
   Tabs,
   Menu,
   MenuItem,
   Checkbox,
   IconButton,
   Divider,
   Dialog,
   DialogTitle,
   DialogContent,
} from '@material-ui/core';
import AppBar from '../../Components/AppBar/AppBar';
import Drawer from '../../Components/Drawer/Drawer';
import auth from '../../Components/Auth/auth';
import CssBaseline from '@material-ui/core/CssBaseline';
import PeopleIcon from '@material-ui/icons/People';
import SystemUpdateAltIcon from '@material-ui/icons/SystemUpdateAlt';
import LocalOfferIcon from '@material-ui/icons/LocalOffer';
import CloseIcon from '@material-ui/icons/Close';
import Fade from '@material-ui/core/Fade';
import RefreshIcon from '@material-ui/icons/Refresh';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import moment from 'moment';
import Compose from '../../Components/Compose/Compose';

export default class Home extends React.Component {
   constructor(props) {
      super(props);
      this.state = {
         value: '',
         anchorEl: null,
         checked: false,
         mails: [],
         sent: true,
         draft: false,
         mail: {},
         inboxSel: false,
         draftSel: false,
         sentSel: false,
      };
      this.logout = () => {
         if (auth.logout()) {
            this.props.history.push('/');
         }
      };
      this.a11yProps = (index) => {
         return {
            id: `simple-tab-${index}`,
            'aria-controls': `simple-tabpanel-${index}`,
         };
      };
      this.inbox = () => {
         this.setState({
            sent: false,
            draft: false,
         });
         this.setState({
            inboxSel: true,
            sentSel: false,
            draftSel: false,
         });
         if (localStorage.getItem('Mails')) {
            var mails = [];
            JSON.parse(localStorage.getItem('Mails')).forEach((mail) => {
               if (
                  mail.to ===
                  JSON.parse(sessionStorage.getItem('user')).user_name
               ) {
                  mails.push(mail);
               }
            });
            this.setState({
               mails: mails,
            });
         } else {
            this.setState({
               mails: [],
            });
         }
      };
      this.sent = () => {
         this.setState({
            sent: true,
            draft: true,
         });
         this.setState({
            inboxSel: false,
            sentSel: true,
            draftSel: false,
         });
         if (localStorage.getItem('Mails')) {
            var mails = [];
            JSON.parse(localStorage.getItem('Mails')).forEach((mail) => {
               if (
                  mail.from ===
                  JSON.parse(sessionStorage.getItem('user')).user_name
               ) {
                  mails.push(mail);
               }
            });
            this.setState({
               mails: mails,
            });
         } else {
            this.setState({
               mails: [],
            });
         }
      };
      this.drafts = () => {
         this.setState({
            sent: true,
            draft: true,
         });
         this.setState({
            inboxSel: false,
            sentSel: false,
            draftSel: true,
         });
         if (localStorage.getItem('Drafts')) {
            var drafts = [];
            JSON.parse(localStorage.getItem('Drafts')).forEach((draft) => {
               if (
                  draft.from ===
                  JSON.parse(sessionStorage.getItem('user')).user_name
               ) {
                  drafts.push(draft);
               }
            });
            this.setState({
               mails: drafts,
            });
         } else {
            this.setState({
               mails: [],
            });
         }
      };
   }

   componentDidMount() {
      this.inbox();
   }
   render() {
      return (
         <Box>
            <CssBaseline />
            <AppBar
               name='Home'
               inbox={() => {
                  this.inbox();
               }}
               drafts={() => {
                  this.drafts();
               }}
               sent={() => {
                  this.sent();
               }}
               inboxSel={this.state.inboxSel}
               sentSel={this.state.sentSel}
               draftSel={this.state.draftSel}
               logout={this.logout}
               prop={this.props}
            />
            <Drawer
               title='New Message'
               inbox={() => {
                  this.inbox(this);
               }}
               drafts={() => {
                  this.drafts(this);
               }}
               sent={() => {
                  this.sent(this);
               }}
            />
            <Box
               position='fixed'
               style={{
                  //backgroundColor: 'green',
                  marginTop: '75px',
                  marginLeft: '240px',
                  width: '83.5vw',
                  display: 'flex',
                  justifyContent: 'center',
                  flexDirection: 'column',
               }}
            >
               <Box
                  width='inherit'
                  display='flex'
                  bgcolor='#D4D8E0'
                  alignItems='center'
               >
                  <Checkbox
                     checked={this.state.checked}
                     onChange={(event) => {
                        this.setState({
                           checked: event.target.checked,
                        });
                     }}
                  />
                  <IconButton
                     onClick={(event) => {
                        this.setState({
                           anchorEl: event.currentTarget,
                        });
                     }}
                  >
                     <ExpandMoreIcon />
                  </IconButton>
                  <Menu
                     style={{ marginTop: '40px' }}
                     id='user-menu'
                     anchorEl={this.state.anchorEl}
                     keepMounted
                     open={Boolean(this.state.anchorEl)}
                     TransitionComponent={Fade}
                     onClose={() => {
                        this.setState({
                           anchorEl: null,
                        });
                     }}
                  >
                     <MenuItem
                        onClick={() => {
                           this.setState({
                              anchorEl: null,
                           });
                        }}
                     >
                        All
                     </MenuItem>
                     <MenuItem
                        onClick={() => {
                           this.setState({
                              anchorEl: null,
                           });
                        }}
                     >
                        Read
                     </MenuItem>
                     <MenuItem
                        onClick={() => {
                           this.setState({
                              anchorEl: null,
                           });
                        }}
                     >
                        None
                     </MenuItem>
                     <MenuItem
                        onClick={() => {
                           this.setState({
                              anchorEl: null,
                           });
                        }}
                     >
                        Unread
                     </MenuItem>
                     <MenuItem
                        onClick={() => {
                           this.setState({
                              anchorEl: null,
                           });
                        }}
                     >
                        Starred
                     </MenuItem>
                  </Menu>
                  <IconButton>
                     <RefreshIcon style={{ fontSize: '20px' }} />
                  </IconButton>
               </Box>
               {!this.state.sent ? (
                  <Box width='inherit'>
                     <Tabs
                        value={this.state.value}
                        onChange={(event, newValue) => {
                           this.setState({
                              value: newValue,
                           });
                        }}
                        aria-label='tabs'
                     >
                        <Tab
                           label='Primary'
                           icon={<SystemUpdateAltIcon />}
                           {...this.a11yProps(0)}
                        />
                        <Tab
                           label='Social'
                           icon={<PeopleIcon />}
                           {...this.a11yProps(1)}
                        />
                        <Tab
                           label='Promotions'
                           icon={<LocalOfferIcon />}
                           {...this.a11yProps(2)}
                        />
                     </Tabs>
                  </Box>
               ) : null}

               <Divider />
               {this.state.mails.length > 0 ? (
                  this.state.mails.map((mail, index) => {
                     return (
                        <Box
                           key={index}
                           bgcolor={
                              mail.status === 'unread' && !this.state.draft
                                 ? 'white'
                                 : '#D4D8E0'
                           }
                           display='flex'
                           flexDirection='row'
                        >
                           <Checkbox></Checkbox>
                           <Box
                              style={{
                                 display: 'flex',
                                 padding: '10px',
                                 paddingLeft: '0px',
                                 alignItems: 'center',
                              }}
                              onClick={() => {
                                 var temp = this.state.mails;
                                 temp.find((e) => {
                                    if (e.id === mail.id) {
                                       if (e.status === 'unread') {
                                          e.status = 'read';
                                       }
                                       this.setState({
                                          mails: temp,
                                          mail: e,
                                          openCompose: true,
                                       });
                                    }
                                 });

                                 var temp1 = JSON.parse(
                                    localStorage.getItem('Mails')
                                 );
                                 temp1.find((e) => {
                                    if (e.id === mail.id) {
                                       if (e.status === 'unread') {
                                          e.status = 'read';
                                       }
                                       if (!this.state.draft) {
                                          localStorage.setItem(
                                             'Mails',
                                             JSON.stringify(temp1)
                                          );
                                       }
                                    }
                                 });
                              }}
                           >
                              <Box
                                 style={{
                                    width: '300px',
                                    display: 'flex',
                                    justifyContent: 'flex-start',
                                    overflow: 'auto',
                                 }}
                              >
                                 <Box>
                                    {this.state.sent === false
                                       ? mail.from
                                       : mail.to}
                                 </Box>
                              </Box>
                              <Box
                                 style={{
                                    width: '48vw',
                                    display: 'flex',
                                    justifyContent: 'flex-start',
                                 }}
                              >
                                 <Box>
                                    {mail.subject.length > 20
                                       ? mail.subject.substring(0, 20) + '...'
                                       : mail.subject}{' '}
                                    -{' '}
                                    {mail.msg.length > 50
                                       ? mail.msg.substring(0, 50) + '...'
                                       : mail.msg}
                                 </Box>
                              </Box>
                              <Box
                                 style={{
                                    width: '150px',
                                    display: 'flex',
                                    justifyContent: 'flex-start',
                                 }}
                              >
                                 <Box>
                                    {moment(mail.time).format(
                                       'DD-MM-YY hh-mm A'
                                    )}
                                 </Box>
                              </Box>
                           </Box>
                           <Divider />
                        </Box>
                     );
                  })
               ) : (
                  <Box
                     display='flex'
                     justifyContent='center'
                     alignItems='center'
                     height='200px'
                     fontSize='20px'
                  >
                     <Box>EMPTY</Box>
                  </Box>
               )}
            </Box>
            <Dialog open={this.state.openCompose} maxWidth='md' fullWidth>
               <DialogTitle style={{ backgroundColor: '#3290F1' }}>
                  <Box display='flex' alignItems='center' color='white'>
                     <Box style={{ width: '100%' }}>
                        {this.state.mail.subject}
                     </Box>
                     <Box>
                        <IconButton
                           aria-label='close'
                           //className={classes.closeButton}
                           onClick={() =>
                              this.setState({
                                 openCompose: false,
                              })
                           }
                        >
                           <CloseIcon style={{ color: 'white' }} />
                        </IconButton>
                     </Box>
                  </Box>
               </DialogTitle>
               <DialogContent style={{ padding: '20px' }}>
                  <Compose
                     close={() =>
                        this.setState({
                           openCompose: false,
                        })
                     }
                     data={this.state.mail}
                     read={true}
                  />
               </DialogContent>
            </Dialog>
         </Box>
      );
   }
}
