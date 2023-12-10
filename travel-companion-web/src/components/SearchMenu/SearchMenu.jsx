import React, {useState} from 'react';
import classes from "./SearhMenu.module.css"

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

    return (
        <div className={classes.searchBar}>
            <div className={classes.searchContainer}>
                <input
                    value={filter.query}
                    onChange={e => setFilter({...filter, query: e.target.value})}
                    type="text" placeholder="Поиск по названию..." />
            </div>
            <div className={classes.checkboxContainer}>
                <label>
                    <input
                        onChange={handleDriverCheckbox}
                        value="driver"
                        type="checkbox"
                    />
                    Водители
                </label>
            </div>
            <div className={classes.checkboxContainer}>
                <label>
                    <input
                        onChange={handleCompanionCheckbox}
                        value="driver"
                        type="checkbox"
                    />
                    Попутчики
                </label>
            </div>
            <div className={classes.selectContainer}>
                <label>
                    Сортировать по:
                    <select
                        onChange={e => setFilter({...filter, sort: e.target.value})}
                        value={filter.sort}>
                        <option disabled value="">...</option>
                        <option value="date_there">Дате отправления</option>
                        <option value="date_back">Дате возвращения</option>
                        <option value="title">Названию</option>
                    </select>
                </label>
            </div>
        </div>
    );
};

export default SearchMenu;
