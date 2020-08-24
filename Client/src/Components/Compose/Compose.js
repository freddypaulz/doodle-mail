import React, { Component } from 'react';
import {
   Box,
   Button,
   TextField,
   InputAdornment,
   IconButton,
} from '@material-ui/core';
import AttachFileIcon from '@material-ui/icons/AttachFile';
import ImageIcon from '@material-ui/icons/Image';
import EmojiEmotionsIcon from '@material-ui/icons/EmojiEmotions';
import LinkIcon from '@material-ui/icons/Link';
import moment from 'moment';
import axios from 'axios';
export default class Compose extends Component {
   constructor(props) {
      super(props);
      this.state = {
         to: '',
         from: JSON.parse(sessionStorage.getItem('user')).user_name,
         subject: '',
         msg: '',
         status: '',
         time: '',
         read: this.props.read,
         draft: this.props.draft,
         sent: this.props.sent,
         error: false,
      };
   }
   componentDidMount() {
      if (this.props.read) {
         this.setState({
            from: this.props.data.from,
            to: this.props.data.to,
            subject: this.props.data.subject,
            msg: this.props.data.msg,
         });
      }
   }
   render() {
      return (
         <Box>
            <Box style={{ marginBottom: '10px' }}>
               <TextField
                  fullWidth
                  required
                  disabled={this.state.read && !this.state.draft ? true : false}
                  value={
                     this.state.read && !this.state.draft
                        ? this.state.sent
                           ? this.state.to
                           : this.state.from
                        : this.state.to
                  }
                  variant='standard'
                  type='text'
                  onChange={(event) => {
                     this.setState({ to: event.target.value });
                  }}
                  error={this.state.error}
                  helperText={this.state.error ? 'Check Mail-Id' : ''}
                  InputProps={{
                     startAdornment: (
                        <InputAdornment position='start'>
                           {this.state.read && !this.state.draft
                              ? this.state.sent
                                 ? 'To'
                                 : 'From'
                              : 'To'}
                        </InputAdornment>
                     ),
                  }}
               />
            </Box>
            {!this.state.read || this.state.draft ? (
               <Box style={{ marginBottom: '10px' }}>
                  <TextField
                     fullWidth
                     required
                     disabled={
                        this.state.read && !this.state.draft ? true : false
                     }
                     value={this.state.subject}
                     variant='standard'
                     type='text'
                     onChange={(event) => {
                        this.setState({ subject: event.target.value });
                     }}
                     InputProps={{
                        startAdornment: (
                           <InputAdornment position='start'>
                              Subject
                           </InputAdornment>
                        ),
                     }}
                  />
               </Box>
            ) : null}
            <Box style={{ marginBottom: '10px' }}>
               <TextField
                  fullWidth
                  required
                  multiline
                  disabled={this.state.read && !this.state.draft ? true : false}
                  rows='15'
                  value={this.state.msg}
                  variant='standard'
                  type='text'
                  onChange={(event) => {
                     this.setState({ msg: event.target.value });
                  }}
               />
            </Box>
            {!this.state.read || this.state.draft ? (
               <Box style={{ marginBottom: '10px' }}>
                  <Button
                     size='small'
                     style={{
                        backgroundColor: '#3290F1',
                        color: 'white',
                        marginRight: '10px',
                     }}
                     onClick={() => {
                        if (
                           this.state.to !== '' &&
                           this.state.to !== this.state.from
                        ) {
                           axios
                              .post('/mails/add-mail', {
                                 from: this.state.from,
                                 to: this.state.to,
                                 subject: this.state.subject,
                                 msg: this.state.msg,
                                 status: 'unread',
                              })
                              .then((res) => {
                                 this.props.close(true);
                              });
                        } else {
                           this.setState({
                              error: true,
                           });
                        }
                     }}
                  >
                     Send
                  </Button>
                  <Button
                     size='small'
                     style={{
                        backgroundColor: '#3290F1',
                        color: 'white',
                        marginRight: '20px',
                     }}
                     onClick={() => {
                        var time = moment();
                        if (
                           this.state.to !== '' &&
                           this.state.to !== this.state.from
                        ) {
                           axios
                              .post('/drafts/add-draft', {
                                 from: this.state.from,
                                 to: this.state.to,
                                 subject: this.state.subject,
                                 msg: this.state.msg,
                                 status: 'Draft',
                              })
                              .then((res) => {
                                 this.props.close(false);
                              });
                        } else {
                           this.setState({
                              error: true,
                           });
                        }
                     }}
                  >
                     Draft
                  </Button>
                  <IconButton
                     edge='start'
                     color='inherit'
                     aria-label='menu'
                     onClick={() => {}}
                     style={{ marginRight: '10px' }}
                  >
                     <AttachFileIcon style={{ fontSize: '20px' }} />
                  </IconButton>
                  <IconButton
                     edge='start'
                     color='inherit'
                     aria-label='menu'
                     onClick={() => {}}
                     style={{ marginRight: '10px' }}
                  >
                     <ImageIcon style={{ fontSize: '20px' }} />
                  </IconButton>
                  <IconButton
                     edge='start'
                     color='inherit'
                     aria-label='menu'
                     onClick={() => {}}
                     style={{ marginRight: '10px' }}
                  >
                     <LinkIcon style={{ fontSize: '20px' }} />
                  </IconButton>
                  <IconButton
                     edge='start'
                     color='inherit'
                     aria-label='menu'
                     onClick={() => {}}
                     style={{ marginRight: '10px' }}
                  >
                     <EmojiEmotionsIcon style={{ fontSize: '20px' }} />
                  </IconButton>
               </Box>
            ) : (
               <Box style={{ marginTop: '20px' }}>
                  <Button
                     size='small'
                     style={{
                        backgroundColor: '#3290F1',
                        color: 'white',
                        marginRight: '10px',
                     }}
                     onClick={() => {
                        var to = this.state.from;
                        this.setState({
                           to: to,
                           from: JSON.parse(sessionStorage.getItem('user'))
                              .user_name,
                           msg: '',
                           subject: this.state.subject,
                           read: false,
                        });
                     }}
                  >
                     Reply
                  </Button>
               </Box>
            )}
         </Box>
      );
   }
}
