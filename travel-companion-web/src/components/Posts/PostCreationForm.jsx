import React, {useState} from 'react';
import 'react-datepicker/dist/react-datepicker.css';
import MyButton from "../UI/button/MyButton";
import {PostService} from "../../api/PostService";
import classes from "./PostCreationForm.module.css";
import {TextField} from "@mui/material";
import {DatePicker, DesktopDatePicker} from "@mui/x-date-pickers";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Button from '@mui/material/Button';

const PostCreationForm = ({setVisible, posts, setPosts}) => {

    const [dateThere, setDateThere] = useState(new Date());
    const [dateBack, setDateBack] = useState(new Date());
    const [post, setPost] = useState({title: "", description: "", fee:"", date_there:new Date(), date_back:new Date(), post_type:"DRIVER", transport_id:1});

    const createPost = async () => {
        const created = await PostService.createPost(post);
        setPosts([...posts, created]);
        setVisible(false);
    }

    const updateStartDate = (date, setDate, date_type) => {
        setDate(date);
        if (date_type === "there")
            setPost({...post, date_there: date});
        else if (date_type === "back")
            setPost({...post, date_back: date});
    }

    return (
        <form>
            <div className={classes.formGroup}>
                <TextField
                    fullWidth
                    id="description"
                    onChange={e => setPost({...post, title: e.target.value})}
                    value={post.title}
                    label="Заголовок"
                    variant="outlined"
                />
            </div>
            <div className={classes.formGroup}>
                <TextField
                    fullWidth
                    id="description"
                    onChange={e => setPost({...post, description: e.target.value})}
                    value={post.description}
                    label="Описание"
                    variant="outlined"
                />
            </div>
            <div className={classes.formGroup}>
                <TextField
                    fullWidth
                    id="fee"
                    onChange={e => setPost({...post, fee: e.target.value})}
                    value={post.fee}
                    label="Оплата"
                    variant="outlined"
                />
            </div>
            <div className={classes.formGroup} style={{ display: 'flex', gap: '8px' }}>
                <DatePicker
                    label="Дата отправления"
                    selected={dateThere}
                    onChange={(date) => updateStartDate(date, setDateThere, 'there')}
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
                    label="Дата прибытия"
                    format="dd/MM/yyyy"
                    selected={dateBack}
                    onChange={(date) => updateStartDate(date, setDateBack, "back")}
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


            <FormControl fullWidth>
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