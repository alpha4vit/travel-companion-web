import React from 'react';
import classes from "./SearhMenu.module.css"

const SearchMenu = ({filter, setFilter}) => {

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
                        type="checkbox"
                    />
                    Водители
                </label>
            </div>
            <div className={classes.checkboxContainer}>
                <label>
                    <input
                        type="checkbox"
                    />
                    Попутчики
                </label>
            </div>
            <div className={classes.selectContainer}>
                <label>
                    Сортировать по:
                    <select >
                        <option value="date">Дате</option>
                        <option value="name">Имени</option>
                    </select>
                </label>
            </div>
        </div>
    );
};

export default SearchMenu;
