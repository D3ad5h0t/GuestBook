import React from 'react'
import classes from './SortItem.module.css'

const SortItem = props => {
    const itemCls = [classes.SortItem];
    const iconCls = ['fa'];

    if (props.IsCurrentSortColumn) {
        itemCls.push(classes.active);
    }

    props.IsSortAsc ? iconCls.push('fa-sort-amount-asc') : iconCls.push('fa-sort-amount-desc');

    const sortItem = <div
                        className={itemCls.join(' ')}
                        onClick={() => props.onColumnClick(props.tableName)}
                     >
                        <i className={iconCls.join(' ')}></i>
                     </div>;

    return (props.isVisible ? sortItem : null);
};

export default SortItem
