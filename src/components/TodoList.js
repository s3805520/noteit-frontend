import React,{ useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import Box from '@material-ui/core/Box';    
import TodoCard from "./TodoCard";
import Typography from '@material-ui/core/Typography';
import { useParams, useHistory } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  card:{
    width: '100%',
  },
  edit: {
    marginTop: theme.spacing(3),
    marginLeft: theme.spacing(1),
    backgroundColor: "blue"
  },
  delete: {
    marginTop: theme.spacing(3),
    marginLeft: theme.spacing(1),
    backgroundColor: "red"
  },
  form: {
    width: '100%',
  },
  submit: {
    margin: theme.spacing(3, 2, 2),
  },
}));

// todoList to be set in backend fetched frm database and passed as a parameter to TodoLists
export default function TodoList({ props }) {
    const history = useHistory();
    const classes = useStyles()
    const { id } = useParams()
    const [list, setList] = useState([])

    const getUserData = async(userName) => {
      await fetch("/getUserData", {
          method: "POST",
          headers: {
            'Content-Type' : 'application/json'
          },
            body: JSON.stringify({email: userName})
          })
          .then(function(response) {
            return response.json()
          })
          .then(function(data) {
            var responseData = data["notes"]
            if(responseData !== "") {
              var responseList = responseData.split("\\r\\n")
              setList(responseList)
            }
      })
    }

    const setUserData = async(method, id, newList) => {
      await fetch(method, {
        method: "POST",
        headers: {
          'Content-Type' : 'application/json'
        },
          body: JSON.stringify({email: id, notes: newList})
        })
        .then(function(response) {
          return response.json()
        })
        .then(function(data) {
          console.log(data)
          var responseData = data["notes"]
          if(responseData !== "") {
            var responseList = responseData.split("\\r\\n")
            setList(responseList)
          }
          else {
            setList([])
          }
      })
    }

    useEffect(() => {
      getUserData(id)
      window.addEventListener("popstate", () => {
        history.go(1);
      });
    },[])

    const deleteItem = (item) => {
        var newList = [...list].filter(listItem => (listItem !== item))
        setUserData("/deleteNotes", id, newList)
    }

    const addItem = async() => {
      const item = document.getElementById("addValue").value
      document.getElementById("addValue").value = ""
      var newList = [...list, item]
      setUserData("/addNotes", id, newList)
    }

    const editItem = (oldVal, newVal) => {
      var newList = [...list].filter(listItem => (listItem !== oldVal))
      setUserData("/updateNotes", id, [newVal, ...newList])
    }

    return (
        <Container component="main" maxWidth="md">
            <CssBaseline />
              <Box display="flex">
                <Button
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                    onClick={() => history.push("/signin")}
                >
                    Logout
                </Button>
              </Box>
            <div className={classes.paper}>
                <Typography alignSelf="flex-start" component="h1" variant="h5">
                    Hi! { id }. Write down your notes...
                </Typography>
              <Card className={classes.card} >
                  <CardContent>        
                          <Box display="flex">
                              <TextField
                                  variant="outlined"
                                  margin="normal"
                                  required
                                  fullWidth
                                  id="addValue"
                                  label="Enter a Value"
                                  name="add"
                                  autoFocus
                              />
                              <Button
                                  variant="contained"
                                  color="primary"
                                  className={classes.submit}
                                  onClick={addItem}
                              >
                                  Add
                              </Button>
                          </Box>
                  </CardContent>
              </Card>
            </div>
            <div className={classes.paper}>
                {list.map(item => (
                    <TodoCard key={"todo" + Math.floor(Math.random()*1000000)} value={item} deleteItem={deleteItem} editItem={editItem}></TodoCard>
                ))}
            </div>
        </Container>
    );
}