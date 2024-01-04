import React, {useState} from 'react';
import classes from "./SearhMenu.module.css"
import {MySwitch} from "../UI/Switch";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import {FormControlLabel, TextField} from "@mui/material";

const SearchMenu = ({filter, setFilter}) => {

    const [isCheckedDriver, setIsChekedDriver] = useState(false);
    const [isCheckedCompanion, setIsChekedCompanion] = useState(false);

    const handleDriverCheckbox = () =>{
        if (isCheckedDriver){
            setFilter({...filter, driverCheck: false});
        }
        else{
            setFilter({...filter, driverCheck: true});
        }
        setIsChekedDriver(!isCheckedDriver)
    }

    const handleCompanionCheckbox = () =>{
        if (isCheckedCompanion){
            setFilter({...filter, companionCheck: false});
        }
        else{
            setFilter({...filter, companionCheck: true});
        }
        setIsChekedCompanion(!isCheckedCompanion)
    }

    const [age, setAge] = React.useState('');

    const handleChange = (event) => {
        setAge(event.target.value);
    };

    return (
        <div className={classes.searchBar}>
            <div >
                <TextField value={filter.query}
                           onChange={e => setFilter({...filter, query: e.target.value})} id="standard-basic" label="Поиск по названию..." variant="standard" />
            </div>
            <div className={classes.checkboxContainer}>
                <FormControlLabel onChange={handleDriverCheckbox}
                                  control={<MySwitch defaultChecked />}
                                  label="Попутчики"
                />
            </div>
            <div className={classes.checkboxContainer}>
                <FormControlLabel onChange={handleCompanionCheckbox}
                                  control={<MySwitch defaultChecked />}
                                  label="Водители"
                />
            </div>
            <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Сортировать по</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={filter.sort}
                    label="Сортировать по"
                    onChange={e => setFilter({...filter, sort: e.target.value})}
                >
                    <MenuItem value="date_there">Дате отправления</MenuItem>
                    <MenuItem value="date_back">Дате возвращения</MenuItem>
                    <MenuItem value="title">Названию</MenuItem>
                </Select>
            </FormControl>
        </div>
    );
};

export default SearchMenu;
