import React, { useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { Redirect } from 'react-router-dom';
import { API } from 'aws-amplify';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignIn() {

  const classes = useStyles();
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const [redirect, setRedirect] = useState(false);

  const handleChange = e => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value
    });
  };

  const handleSignIn = async() => {
    const creds = credentials
    API.post('validateCredentialsApi', '/validateCredentials', {
      headers: {
        'Content-Type' : 'application/json'
      },
        body: JSON.stringify(creds)
      
    }).then(response => {
      return response.json()
    }).then(function(data) {
      if(data.success)
        setRedirect(data.success)
  }).catch(err => {
      console.log(err);
    })

    // await fetch("/validateCredentials", {
    //   method: "POST",
    //   headers: {
    //     'Content-Type' : 'application/json'
    //   },
    //     body: JSON.stringify(creds)
    //   })
    //   .then(function(response) {
    //     return response.json()
    //   })
    //   .then(function(data) {
    //     if(data.success)
    //       setRedirect(data.success)
    // })
  }

  return !redirect ? (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form className={classes.form}>  {/* noValidate> */}
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            onChange={handleChange}
            autoComplete="email"
            autoFocus
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            onChange={handleChange}
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
          />

          <Button
            type="button"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={handleSignIn}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href="/reset" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link href="/signup" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  ) : (
    <Redirect to={`/list/${credentials.email}`} />
  );
}