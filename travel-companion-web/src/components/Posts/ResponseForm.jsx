import React, {useState} from 'react';
import classes from "./PostCreationForm.module.css";
import {PostReponseService} from "../../api/PostReponseService";
import {TextField} from "@mui/material";
import Button from "@mui/material/Button";
import {message} from "antd";
import TransitionAlert from "../UI/Alert/TransitionAlert";

const ResponseForm = ({responsedPostId, setResponseVisible, callback}) => {

    const user = JSON.parse(localStorage.getItem("authenticatedUser"));
    const [response, setResponse] = useState({contact:"", comment:""});
    const [contactError, setContactError] = useState(false);
    const [commentError, setCommentError] = useState(false);

    const [contactErrorMessage, setContactErrorMessage] = useState("");
    const [commentErrorMessage, setCommentErrorMessage] = useState("");

    const respond =  () => {
        PostReponseService.respond(response, user.id, responsedPostId, handleContactError, handleCommentError, () => {
            setResponseVisible(false);
            callback();
        });

    }

    const handleContactError = (message) => {
        setContactError(true);
        setContactErrorMessage(message);
    }

    const handleCommentError = (message) => {
        setCommentError(true);
        setCommentErrorMessage(message);
    }


    return (
        <div>
            <form>
                <div className={classes.formGroup}>
                    <TextField
                        fullWidth
                        id="description"
                        onChange={(e) => setResponse({...response, comment: e.target.value})}
                        value={response.comment}
                        label="Комментарий"
                        variant="outlined"
                    />
                    <TransitionAlert message={commentErrorMessage} open={commentError} setOpen={setCommentError}  />
                </div>
                <div className={classes.formGroup}>
                    <TextField
                        fullWidth
                        id="description"
                        onChange={(e) => setResponse({...response, contact: e.target.value})}
                        value={response.contact}
                        label="Контактная информация"
                        variant="outlined"
                    />
                    <TransitionAlert message={contactErrorMessage} open={contactError} setOpen={setContactError}  />
                </div>
                <Button fullWidth variant="contained" onClick={() => respond()}>Откликнуться!</Button>
            </form>
        </div>
    );
};

export default ResponseForm;