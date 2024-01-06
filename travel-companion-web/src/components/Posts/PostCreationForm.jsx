import React, {useState} from 'react';
import 'react-datepicker/dist/react-datepicker.css';
import MyButton from "../UI/button/MyButton";
import {PostService} from "../../api/PostService";
import classes from "./PostCreationForm.module.css";
import {FilledInput, TextField} from "@mui/material";
import {DatePicker, DesktopDatePicker} from "@mui/x-date-pickers";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Button from '@mui/material/Button';
import TransitionAlert from "../UI/Alert/TransitionAlert";
import {FormHelperText} from "@mui/joy";
import Input from "@mui/material/Input";

const PostCreationForm = ({setVisible, posts, setPosts}) => {

    const [dateThere, setDateThere] = useState(new Date());
    const [dateBack, setDateBack] = useState(new Date());
    const [post, setPost] = useState({title: "", description: "", fee:"", date_there:new Date(), date_back:new Date(), post_type:"DRIVER", transport_id:1});

    const [titleError, setTitleError] = useState(false);
    const [descError, setDescError] = useState(false);
    const [feeError, setFeeError] = useState(false);
    const [dateError, setDateError] = useState(false);

    const [titleErrorMessage, setTitleMessageError] = useState("");
    const [descErrorMessage, setDescMessageError] = useState("");
    const [feeErrorMessage, setFeeErrorMessage] = useState("");
    const [dateErrorMessage, setDateErrorMessage] = useState("");

    const createPost = async () => {
        if (!dateError) {
            await PostService.createPost(post, handleTitleError, handleDescError, handleFeeError, handleDateError, (created) => {
                setPosts([...posts, created]);
                setVisible(false);
            });
        }

    }

    const updateStartDate = (date, setDate, date_type) => {
        setDate(date);
        if (date_type === "there")
            setPost({...post, date_there: date});
        else if (date_type === "back")
            setPost({...post, date_back: date});
    }

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
                    onChange={e => {
                        setPost({...post, title: e.target.value});
                        setTitleError(false);
                    }}
                    value={post.title}
                    label="Заголовок"
                    variant="outlined"
                />
                <TransitionAlert message={titleErrorMessage} open={titleError} setOpen={setTitleError}  />
            </div>
            <div className={classes.formGroup}>
                <TextField
                    error={descError}
                    fullWidth
                    id="description"
                    onChange={e => {
                        setPost({...post, description: e.target.value});
                        setDescError(false);
                    }}
                    value={post.description}
                    label="Описание"
                    variant="outlined"
                />
                <TransitionAlert message={descErrorMessage} open={descError} setOpen={setDescError}  />
            </div>
            <div className={classes.formGroup}>
                <TextField
                    error={feeError}
                    fullWidth
                    id="fee"
                    onChange={e => {
                        setPost({...post, fee: e.target.value})
                        setFeeError(false);
                    }}
                    value={post.fee}
                    label="Оплата"
                    variant="outlined"
                />
                <TransitionAlert message={feeErrorMessage} open={feeError} setOpen={setFeeError}  />
            </div>
            <div className={classes.formGroup} style={{ display: 'flex', gap: '8px' }}>
                <DatePicker
                    defaultValue={new Date()}
                    onError={() => {
                        setDateError(true)
                    }}
                    disablePast
                    label="Дата отправления"
                    selected={dateThere}
                    onChange={(date) => {
                        updateStartDate(date, setDateThere, 'there');
                        setDateError(false);
                    }}
                    format="dd/MM/yyyy"
                    style={{zIndex:13000}}
                    slotProps={{
                        layout: {
                            sx: {
                                '.MuiDateCalendar-root': {
                                    marginRight: 50,
                                    zIndex:13000
                                }
                            }
                        }
                    }}
                />
                <DatePicker
                    defaultValue={new Date()}
                    onError={() => setDateError(true)}
                    disablePast
                    label="Дата прибытия"
                    format="dd/MM/yyyy"
                    selected={dateBack}
                    onChange={(date) => {
                        updateStartDate(date, setDateBack, "back");
                        setDateError(false);
                    }}
                    style={{zIndex:13000}}
                    slotProps={{
                        layout: {
                            sx: {
                                '.MuiDateCalendar-root': {
                                    marginLeft: 10,
                                    zIndex:13000
                                }
                            }
                        }
                    }}
                />
            </div>
            <TransitionAlert message={dateErrorMessage} open={dateError} setOpen={setDateError} />
            <FormControl style={dateError ? {marginTop:20} : {marginTop:0}} fullWidth>
                <InputLabel id="demo-simple-select-label">Тип объявления</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="postType"
                    value={post.post_type}
                    label="Тип объявления"
                    onChange={e => setPost({...post, post_type: e.target.value})}
                >
                    <MenuItem value="DRIVER">Водитель</MenuItem>
                    <MenuItem value="COMPANION">Попутчик</MenuItem>
                </Select>
            </FormControl>
            <div style={{marginTop:10}}>
                <Button fullWidth variant="contained" onClick={createPost}>Сохранить изменения</Button>
            </div>
        </form>

    );
};


export default PostCreationForm;