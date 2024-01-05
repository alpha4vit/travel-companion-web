import React, {useState} from 'react';
import classes from "./PostCreationForm.module.css";
import {PostReponseService} from "../../api/PostReponseService";
import {TextField} from "@mui/material";
import Button from "@mui/material/Button";

const ResponseForm = ({responsedPostId, setResponseVisible, callback}) => {

    const user = JSON.parse(localStorage.getItem("authenticatedUser"));
    const [response, setResponse] = useState({title:"", comment:"", stars:0});

    const respond =  () => {
        console.log(responsedPostId)
        PostReponseService.respond(response, user.id, responsedPostId);
        setResponseVisible(false);
        callback();
    }

    return (
        <div>
            <form>
                <div className={classes.formGroup}>
                    <TextField
                        fullWidth
                        id="description"
                        onChange={(e) => setResponse({...response, title: e.target.value})}
                        value={response.title}
                        label="Заголовок"
                        variant="outlined"
                    />
                </div>
                <div className={classes.formGroup}>
                    <TextField
                        fullWidth
                        id="description"
                        onChange={(e) => setResponse({...response, comment: e.target.value})}
                        value={response.comment}
                        label="Комментарий"
                        variant="outlined"
                    />
                </div>
                <Button fullWidth variant="contained" onClick={() => respond()}>Откликнуться!</Button>
            </form>
        </div>
    );
};

export default ResponseForm;