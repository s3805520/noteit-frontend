import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import TextField from '@material-ui/core/TextField';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import Box from '@material-ui/core/Box';    
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import SaveIcon from '@material-ui/icons/Save';
import { IconButton } from '@material-ui/core'; 

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(1),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  card:{
    width: '100%',
  },
  edit: {
    marginLeft: theme.spacing(1),
    color: theme.palette.primary.main
  },
  delete: {
    color: theme.palette.secondary.main
  },
  save: {
    color: "black"
  },
  form: {
    width: '100%',
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function TodoCard({ value, deleteItem, editItem }) {
    const classes = useStyles();
    const [disabled, setDisabled] = useState(true)
    const [val, setVal] = useState(value)
    var oldVal = value
    const id = "todo" + Math.floor(Math.random()*1000000)

    const deleteValue = () => {
        deleteItem(val)
    }

    const saveValue = () => {
        const oval= oldVal
        oldVal = val
        setDisabled(!disabled)
        editItem(oval, val)

    }

    return (
        <Container component="main" maxWidth="md">
            <CssBaseline />
            <div className={classes.paper}>
                <Card className={classes.card} >
                    <CardContent>        
                        <form className={classes.form} noValidate>
                            <Box display="flex">
                                <TextField
                                    key={id}
                                    variant="outlined"
                                    margin="normal"
                                    disabled={disabled}
                                    fullWidth
                                    id={id}
                                    value={val}
                                    label="To-Do"
                                    onChange={(e) => {setVal(e.target.value)}}
                                    name="todocard"
                                    autoFocus
                                />
                                <Box display="flex">
                                    {disabled &&
                                        <IconButton className={classes.edit} onClick={() => setDisabled(!disabled)}>
                                            <EditIcon fontSize="large" />
                                        </IconButton>
                                    }
                                    <IconButton className={classes.delete} onClick={deleteValue}>
                                        <DeleteIcon fontSize="large" />
                                    </IconButton>
                                    {!disabled &&
                                        <IconButton className={classes.save} onClick={saveValue}>
                                            <SaveIcon fontSize="large" />
                                        </IconButton>
                                    }
                                </Box>
                            </Box>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </Container>
    );
}