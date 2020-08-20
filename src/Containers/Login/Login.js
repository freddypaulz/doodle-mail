import React, { Component } from 'react';
import { Box, TextField, Button, InputAdornment } from '@material-ui/core';
import { PaperBoard } from '../../Components/PaperBoard/PaperBoard';
import AccountBoxOutlinedIcon from '@material-ui/icons/AccountBoxOutlined';
import VpnKeyIcon from '@material-ui/icons/VpnKey';
import auth from '../../Components/Auth/auth';
import { Link } from 'react-router-dom';

const styles = {
   box: {
      display: 'flex',
      width: '100%',
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: '20px',
   },
};

export default class Login extends Component {
   componentDidMount() {
      if (this.props.history.location.state) {
         if (this.props.history.location.state.Errors[0]) {
            this.setState({
               errors: this.props.history.location.state.Errors,
            });
         }
         if (this.props.history.location.state.Success[0]) {
            this.setState({
               success: this.props.history.location.state.Success,
            });
         }
      }
   }
   constructor(props) {
      super(props);
      this.state = {
         user_name: '',
         password: '',
         errors: [],
         success: [],
      };
   }

   render() {
      return (
         <Box
            flexDirection='column'
            height='100vh'
            bgcolor='white'
            style={styles.box}
         >
            <Box width='30vw'>
               <PaperBoard>
                  <Box
                     style={{ fontWeight: 'bolder', color: '#3290F1' }}
                     fontSize='35px'
                     mb={3}
                  >
                     Login
                  </Box>
                  <Box style={styles.box}>
                     <AccountBoxOutlinedIcon
                        style={{
                           fontSize: '40px',
                           marginRight: '10px',
                           color: '#3290F1',
                        }}
                     ></AccountBoxOutlinedIcon>
                     <TextField
                        color='primary'
                        size='small'
                        fullWidth
                        required
                        variant='outlined'
                        label='User Name'
                        type='text'
                        InputProps={{
                           endAdornment: (
                              <InputAdornment position='end'>
                                 @mail.com
                              </InputAdornment>
                           ),
                        }}
                        onChange={(event) => {
                           this.setState({ user_name: event.target.value });
                        }}
                     ></TextField>
                  </Box>
                  <Box style={styles.box}>
                     <VpnKeyIcon
                        style={{
                           fontSize: '40px',
                           marginRight: '10px',
                           color: '#3290F1',
                        }}
                     ></VpnKeyIcon>
                     <TextField
                        size='small'
                        variant='outlined'
                        fullWidth
                        label='Password'
                        required
                        type='password'
                        onChange={(event) => {
                           this.setState({ password: event.target.value });
                        }}
                     ></TextField>
                  </Box>
                  <Button
                     variant='contained'
                     size='large'
                     color='primary'
                     onClick={() => {
                        this.setState({
                           errors: [],
                           success: [],
                        });
                        var Users = JSON.parse(localStorage.getItem('Users'));
                        // alert(Users);
                        var flag = true;
                        var dup = false;
                        Users.forEach((user) => {
                           if (
                              this.state.user_name + '@mail.com' ===
                                 user.user_name &&
                              this.state.password === user.password
                           ) {
                              auth.login(true);
                              sessionStorage.setItem(
                                 'user',
                                 JSON.stringify(user)
                              );
                              //alert(sessionStorage.getItem('users'));
                              if (sessionStorage.getItem('users') === null) {
                                 //var temp = JSON.parse(sessionStorage.getItem('users'))
                                 sessionStorage.setItem(
                                    'users',
                                    JSON.stringify([])
                                 );
                              }
                              var temp = JSON.parse(
                                 sessionStorage.getItem('users')
                              );
                              temp.forEach((user) => {
                                 if (
                                    user.user_name ===
                                    JSON.parse(sessionStorage.getItem('user'))
                                       .user_name
                                 ) {
                                    dup = true;
                                 }
                              });
                              if (!dup) {
                                 temp.push(user);
                                 sessionStorage.setItem(
                                    'users',
                                    JSON.stringify(temp)
                                 );
                              }

                              this.props.history.push('/home');
                              flag = false;
                           }
                        });
                        if (flag) {
                           this.setState({
                              errors: ['User Name or Password is invalid'],
                           });
                        }
                     }}
                  >
                     Login
                  </Button>
                  {this.state.errors.length > 0 ? (
                     this.state.errors.map((error, index) => {
                        return error != null ? (
                           <Box
                              key={index}
                              bgcolor='#f73067'
                              marginTop='10px'
                              padding='10px'
                              width='90%'
                              textAlign='center'
                              color='white'
                           >
                              {error}
                           </Box>
                        ) : (
                           <Box key={index}></Box>
                        );
                     })
                  ) : (
                     <Box></Box>
                  )}
                  {this.state.success.length > 0 ? (
                     this.state.success.map((success, index) => {
                        return success != null ? (
                           <Box
                              key={index}
                              bgcolor='green'
                              marginTop='10px'
                              padding='10px'
                              width='90%'
                              textAlign='center'
                              color='white'
                           >
                              {success}
                           </Box>
                        ) : (
                           <Box key={index}></Box>
                        );
                     })
                  ) : (
                     <Box></Box>
                  )}
                  <Box
                     style={{
                        marginTop: '10px',
                        marginBottom: '10px',
                        fontSize: '18px',
                        fontWeight: '500',
                     }}
                  >
                     or
                  </Box>
                  <Link to={'/new'} style={{ color: '#3290F1' }}>
                     Create Account
                  </Link>
               </PaperBoard>
            </Box>
         </Box>
      );
   }
}
