import React, { Component } from 'react'
import classes from './MessageCreator.module.css'
import Input from '../../components/UI/Input/Input'
import Button from '../../components/UI/Button/Button'
import axios from 'axios'

export default class MessageCreator extends Component {
    state = {
        isFormValid: false,
        formControls: {
            userName: {
                value: '',
                type: 'username',
                label: 'Имя пользователя',
                errorMessage: 'Введите корректное имя',
                valid: false,
                touched: false,
                validation: {
                    required: true,
                    userName: true
                }
            },
            email: {
                value: '',
                type: 'email',
                label: 'Email',
                errorMessage: 'Введите корректный email',
                valid: false,
                touched: false,
                validation: {
                    required: true,
                    email: true
                }
            },
            homepage: {
                value: '',
                type: 'homepage',
                label: 'Домашняя страница',
                errorMessage: 'Введите корректную Домашнюю Страницу',
                valid: false,
                touched: false,
                validation: {
                    required: false,
                    homepage: true
                }
            },
            Text: {
                value: '',
                type: 'Text',
                label: 'Сообщение',
                errorMessage: 'Введите корректное сообщение',
                valid: false,
                touched: false,
                validation: {
                    required: true,
                    Text: true
                }
            }
        }
    };

    submitHandler = event => {
        event.preventDefault();
    };

    createHandler = async () => {
        const message = {
            userName: this.state.formControls.userName.value,
            email: this.state.formControls.email.value,
            homepage: this.state.formControls.homepage.valid ? this.state.formControls.homepage.value : '',
            Text: this.state.formControls.Text.value
        };

        await axios({
                method: 'POST',
                url: 'api/Messages/CreateMessage',
                data: JSON.stringify(message),
                headers: { 'Content-Type': 'application/json; charset=utf-8' }
        })
            .then(res => {
                this.props.onCancelClick();
            })
            .catch(e => console.log(e));
    };

    clearHandler = () => {
        const formControls = this.state.formControls;

        Object.keys(formControls).map(key => {
            formControls[key].value = '';
            formControls[key].touched = false;
        });

        this.setState({
            formControls,
            isFormValid: false
        });
    };

    validateControl(value, validation) {
        if (!validation) {
            return true;
        }

        let isValid = true;

        if (validation.required) {
            isValid = value.trim() !== '' && isValid;
        }

        if (validation.email) {
            const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            isValid = re.test(String(value).toLowerCase()) && isValid
        }

        if (validation.userName) {
            const re = /^[a-zA-Z0-9]+$/;
            isValid = re.test(String(value).toLowerCase()) && isValid
        }

        if (validation.Text) {
            const re = /<[^>]+>/g;
            isValid = !re.test(String(value).toLowerCase()) && isValid
        }

        if (validation.homepage) {
            const re = /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/g;
            isValid = re.test(String(value).toLowerCase())
        }

        return isValid;
    }

    onChangeHandler = (event, controlName) => {
        const formControls = { ...this.state.formControls };
        const control = { ...formControls[controlName] };

        control.value = event.target.value;
        control.touched = true;
        control.valid = this.validateControl(control.value, control.validation);

        formControls[controlName] = control;

        let isFormValid = true;

        Object.keys(formControls).forEach(name => {
            if (formControls[name].validation.required) {
                isFormValid = formControls[name].valid && isFormValid
            }
        });

        this.setState({
            formControls,
            isFormValid
        });
    };

    renderInputs() {
        return Object.keys(this.state.formControls).map((controlName, index) => {
            const control = this.state.formControls[controlName];

            return (
                <Input
                    key={controlName + index}
                    type={control.type}
                    value={control.value}
                    valid={control.valid}
                    touched={control.touched}
                    label={control.label}
                    shouldValidate={!!control.validation}
                    errorMessage={control.errorMessage}
                    onChange={event => this.onChangeHandler(event, controlName)} />
            );
        });
    }

    render() {

        return (
            <div className={classes.MessageCreator}>
                <div>
                    <h1>Создание нового сообщения</h1>

                    <form onSubmit={this.submitHandler} className={classes.MessageCreatorForm}>
                        {this.renderInputs()}

                        <div className={classes.ButtonsArea}>
                            <Button
                                type={"error"}
                                onClick={this.props.onCancelClick}
                                disabled={false}>
                                Отмена
                            </Button>

                            <Button
                                type={"primary"}
                                onClick={this.clearHandler}
                                disabled={false}>
                                Очистить
                            </Button>

                            <Button
                                type={"success"}
                                onClick={this.createHandler}
                                disabled={!this.state.isFormValid}>
                                Добавить
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
};


