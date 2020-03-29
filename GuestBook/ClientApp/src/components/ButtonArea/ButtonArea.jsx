import React from 'react'
import classes from './ButtonArea.module.css'
import Button from '../UI/Button/Button'

const ButtonArea = props => {
    return(
        <div className={classes.ButtonArea}>
            <Button
                type="primary"
                onClick={() => props.onAddBtnClick()}
                disabled={false}>
                Добавить сообщение
            </Button>
        </div>
    );
};

export default ButtonArea
