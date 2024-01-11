import React, {useEffect, useState} from 'react';
import classes from "../Posts/PostCreationForm.module.css";
import {TextField} from "@mui/material";
import TransitionAlert from "../UI/Alert/TransitionAlert";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import {DatePicker} from "@mui/x-date-pickers";

const PostEditForm = ({post, setPost, editPost, isMapOpen, setIsMapOpen, setRoute}) => {

    useEffect(() => {
        setRoute(post.route);
    }, []);

    const [edited, setEdited] = useState(post);

    const [titleError, setTitleError] = useState(false);
    const [descError, setDescError] = useState(false);
    const [feeError, setFeeError] = useState(false);
    const [dateError, setDateError] = useState(false);
    const [routeError, setRouteError] = useState(false);

    const [titleErrorMessage, setTitleMessageError] = useState("");
    const [descErrorMessage, setDescMessageError] = useState("");
    const [feeErrorMessage, setFeeErrorMessage] = useState("");
    const [dateErrorMessage, setDateErrorMessage] = useState("");
    const [routeErrorMessage, setRouteErrorMessage] = useState("");

    const handleTitleError = (message) => {
        setTitleError(true);
        setTitleMessageError(message);
    }

    const handleDescError = (message) => {
        setDescError(true);
        setDescMessageError(message);
    }

    const handleFeeError = (message) => {
        setFeeError(true);
        setFeeErrorMessage(message);
    }

    const handleDateError = (message) => {
        setDateError(true);
        setDateErrorMessage(message);
    }

    return (
        <form>
            <div className={classes.formGroup}>
                <TextField
                    error={titleError}
                    fullWidth
                    id="description"
                    onChange={e => setEdited({...edited, title: e.target.value})}
                    value={edited.title}
                    label="Заголовок"
                    variant="outlined"
                />
                <TransitionAlert message={titleErrorMessage} open={titleError} setOpen={setTitleError}/>
            </div>

            <div className={classes.formGroup}>
                <TextField
                    error={descError}
                    fullWidth
                    id="description"
                    onChange={e => setEdited({...edited, description: e.target.value})}
                    value={edited.description}
                    label="Описание"
                    variant="outlined"
                />
                <TransitionAlert message={descErrorMessage} open={descError} setOpen={setDescError}/>
            </div>

            <div className={classes.formGroup}>
                <TextField
                    error={feeError}
                    fullWidth
                    id="description"
                    onChange={e => setEdited({...post, fee: e.target.value})}
                    value={edited.fee}
                    label="Оплата"
                    variant="outlined"
                />
                <TransitionAlert message={feeErrorMessage} open={feeError} setOpen={setFeeError}/>
            </div>

            <div className={classes.formGroup} style={{display: 'flex', gap: '8px'}}>
                <DatePicker
                    defaultValue={new Date(post.date_there)}
                    disablePast
                    label="Дата отправления"
                    selected={new Date(edited.date_there)}
                    onChange={(date) => {
                        setEdited({...edited, date_there:date});
                        setDateError(false);
                    }}
                    format="dd/MM/yyyy"
                    style={{zIndex: 13000}}
                    slotProps={{
                        layout: {
                            sx: {
                                '.MuiDateCalendar-root': {
                                    marginRight: 50,
                                    zIndex: 13000
                                }
                            }
                        }
                    }}
                />
                <DatePicker
                    defaultValue={new Date(post.date_back)}
                    disablePast
                    label="Дата прибытия"
                    format="dd/MM/yyyy"
                    selected={new Date(edited.date_back)}
                    onChange={(date) => {
                        setEdited({...edited, date_back:date});
                        setDateError(false);
                    }}
                    style={{zIndex: 13000}}
                    slotProps={{
                        layout: {
                            sx: {
                                '.MuiDateCalendar-root': {
                                    marginLeft: 10,
                                    zIndex: 13000
                                }
                            }
                        }
                    }}
                />
            </div>
            <TransitionAlert message={dateErrorMessage} open={dateError} setOpen={setDateError}/>
            <FormControl style={dateError ? {marginTop: 20} : {marginTop: 0}} fullWidth>
                <InputLabel id="demo-simple-select-label">Тип объявления</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="postType"
                    value={edited.post_type}
                    label="Тип объявления"
                    onChange={e => setEdited({...edited, post_type: e.target.value})}
                >
                    <MenuItem value="DRIVER">Водитель</MenuItem>
                    <MenuItem value="COMPANION">Попутчик</MenuItem>
                </Select>
            </FormControl>
            <div style={{marginTop: 10}}>
                <Button fullWidth variant="contained" onClick={() => {
                    setIsMapOpen(!isMapOpen);
                }}>Открыть карту для выбора маршрута</Button>
            </div>
            <TransitionAlert message={routeErrorMessage} open={routeError} setOpen={setRouteError}/>
            <div style={{marginTop: 10}}>
                <Button fullWidth variant="contained" onClick={() => editPost(edited, handleTitleError, handleDescError, handleFeeError, handleDateError)}>Сохранить изменения</Button>
            </div>
        </form>
    );
};

export default PostEditForm;