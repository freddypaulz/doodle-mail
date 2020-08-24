import React from 'react';
import { PaperBoard } from '../../Components/PaperBoard/PaperBoard';
import { Button, TextField, Box, InputAdornment } from '@material-ui/core';
import { Redirect } from 'react-router-dom';
import axios from 'axios';

const styles = {
   box: {
      display: 'flex',
      width: '100%',
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: '20px',
   },
};

export default class NewUser extends React.Component {
   constructor(props) {
      super(props);
      this.state = {
         first_name: '',
         last_name: '',
         user_name: '',
         password: '',
         c_password: '',
         errors: [],
         redirect: false,
      };
   }
   render() {
      if (this.state.redirect) {
         return (
            <Redirect
               to={{
                  pathname: '/',
                  state: {
                     from: this.props.location,
                     Success: ['Account Created Successfully'],
                     Errors: [],
                  },
               }}
            />
         );
      }
      return (
         <Box
            flexDirection='column'
            height='100vh'
            bgcolor='white'
            style={styles.box}
         >
            <Box width='30vw' borderColor='#3290F1'>
               <PaperBoard>
                  <Box
                     style={{ fontWeight: 'bolder', color: '#3290F1' }}
                     fontSize='30px'
                     mb={3}
                  >
                     Create Account
                  </Box>
                  <Box style={styles.box}>
                     <TextField
                        //color='primary'
                        size='small'
                        fullWidth
                        required
                        variant='outlined'
                        label='First Name'
                        type='text'
                        style={{ marginRight: '10px' }}
                        onChange={(event) => {
                           this.setState({ first_name: event.target.value });
                        }}
                     />

                     <TextField
                        //color='primary'
                        size='small'
                        fullWidth
                        required
                        variant='outlined'
                        label='Last Name'
                        type='text'
                        onChange={(event) => {
                           this.setState({ last_name: event.target.value });
                        }}
                     />
                  </Box>
                  <Box style={styles.box}>
                     <TextField
                        //color='primary'
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
                     />
                  </Box>
                  <Box style={styles.box}>
                     <TextField
                        //color='primary'
                        size='small'
                        fullWidth
                        required
                        variant='outlined'
                        label='Password'
                        type='password'
                        onChange={(event) => {
                           this.setState({ password: event.target.value });
                        }}
                     />
                  </Box>
                  <Box style={styles.box}>
                     <TextField
                        //color='primary'
                        size='small'
                        fullWidth
                        required
                        variant='outlined'
                        label='Confirm Password'
                        type='password'
                        onChange={(event) => {
                           this.setState({ c_password: event.target.value });
                        }}
                     />
                  </Box>
                  <Button
                     variant='contained'
                     size='large'
                     color='primary'
                     onClick={() => {
                        this.setState({
                           errors: [],
                        });
                        var errors = [];

                        if (
                           this.state.first_name !== '' &&
                           this.state.last_name !== '' &&
                           this.state.user_name !== '' &&
                           this.state.password !== ''
                        ) {
                           if (this.state.c_password === this.state.password) {
                              axios
                                 .post('/users/add-user', {
                                    user_name:
                                       this.state.user_name + '@mail.com',
                                    first_name: this.state.first_name,
                                    last_name: this.state.last_name,
                                    password: this.state.password,
                                    password2: this.state.c_password,
                                 })
                                 .then((res) => {
                                    console.log(res);
                                    if (res.data.errors.length > 0) {
                                       console.log(res.data.errors);
                                       this.setState({
                                          errors: [...res.data.errors],
                                       });
                                    } else {
                                       this.setState({
                                          redirect: true,
                                       });
                                    }
                                 })
                                 .catch((err) => console.log(err));
                           } else {
                              errors.push('Passwords does not match');
                              this.setState({
                                 errors: errors,
                              });
                           }
                        } else {
                           errors.push('Enter All required fields');

                           this.setState({
                              errors: errors,
                           });
                        }
                     }}
                  >
                     Create
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
               </PaperBoard>
            </Box>
         </Box>
      );
   }
}
