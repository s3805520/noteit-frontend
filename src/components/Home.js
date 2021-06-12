import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import ListOutlinedIcon from '@material-ui/icons/ListOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { useHistory } from 'react-router-dom';

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

export default function Home() {
  const classes = useStyles();
  const history = useHistory();

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <ListOutlinedIcon fontSize="large" />
        </Avatar>
        <Typography component="h1" variant="h5">
          NOTE IT!!
        </Typography>
          <form className={classes.form} noValidate>        
            <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                    <Button
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                        onClick={() => history.push('/signin')}
                    >
                        Sign In
                    </Button>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Button
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                        onClick={() => history.push('/signup')}
                    >
                        Sign Up
                    </Button>
                </Grid>
            </Grid>
        </form>
      </div>
    </Container>
  );
}