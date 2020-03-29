import React from 'react'
import classes from './Pagination.module.css'


const getNavArrowPageItem = ((direction, onArrowItemClick, isDisabled) => {
    const cls = isDisabled ? "page-item disabled" : "page-item";
    const isPrevArrow = direction === 'left';

    return (
        <li className={cls}>
            <a key={direction} className="page-link" aria-label="Previous" onClick={() => onArrowItemClick(isPrevArrow)
}>
                {
                    isPrevArrow
                        ? <span aria-hidden="true">&laquo;</span>
                        : <span aria-hidden="true">&raquo;</span>
                }
            </a>
        </li>
    );
});

const getPageItems = ((pageCount, currentPage, onItemClick) => {
    const content = [];

    for (let number = 1; number <= pageCount; number++) {
        let cls = number === currentPage ? "page-item active" : "page-item";

        content.push(
            <li key={`page-${number}`} className={cls}>
                <a
                    key={`link-${number}`}
                    className="page-link"
                    onClick={() => onItemClick(number)}>{number}</a>
            </li>
        );
    }

    return content;
});

const Pagination = props => {
    const prevNavArrowPageItem = getNavArrowPageItem('left', props.onArrowItemClick, props.currentPage === 1);
    const nextNavArrowPageItem = getNavArrowPageItem('right', props.onArrowItemClick, props.currentPage === props.pageCount);
    const pageItems = getPageItems(props.pageCount, props.currentPage, props.onItemClick);

    return (
        <div className={classes.Pagination}>
            <nav aria-label="Page navigation example">
                <ul className="pagination">
                    {prevNavArrowPageItem}

                    {pageItems}

                    {nextNavArrowPageItem}
                </ul>
            </nav>
        </div>
    );
};

export default Pagination
