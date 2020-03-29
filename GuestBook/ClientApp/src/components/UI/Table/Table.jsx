import React from 'react'
import SortItem from '../SortItem/SortItem'

const generateTableThead = (tableSchema, onColumnClick) => {
    const tr = generateTableTr(tableSchema, onColumnClick, 'tr');

    return (
        <thead>
        {tr}
        </thead>
    );
};

const generateTbody = ((tableSchema, items) => {
    const content =  items.map(item => {
        const itemSchema = generateItemsSchema(tableSchema, item);
        return generateTableTr(itemSchema);
    });

    return (
        <tbody>
        {content}
        </tbody>
    );
});

const generateItemsSchema = ((tableSchema, item) => {
    const itemSchema = Object.keys(tableSchema).reduce((acc, key) => {
        if (key in item) {
            acc[key] = item[key];
        }

        return acc;
    }, {});

    return itemSchema;
});

const generateTableTr = ((tableSchema, onColumnClick, tagName = 'td') => {
    const row = Object.values(tableSchema).map(value => {
        return tagName !== 'td'
            ? <th key={value.Text}>
                {value.Text}
                <SortItem
                    tableName={value.Text}
                    isVisible={value.IsSortableColumn}
                    IsCurrentSortColumn={value.IsCurrentSortColumn}
                    IsSortAsc={value.IsSortAsc}
                    onColumnClick={onColumnClick}
                />
              </th>
            : <td key={value}>{value}</td>
    });

    return (
        <tr key={`tr${Math.random()}`}>
            {row}
        </tr>
    );
});

const Table = props => {
    const tableThead = generateTableThead(props.tableSchema, props.onColumnClick);
    const tableBody = generateTbody(props.tableSchema, props.list);

    return (
        <section>
            <div className="table-container">
                <table className="table">
                    {tableThead}
                    {tableBody}
                </table>
            </div>
        </section>
    );
};

export default Table
