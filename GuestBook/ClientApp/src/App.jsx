import React, {Component} from 'react';
import './App.module.css';
import Table from './components/UI/Table/Table'
import Pagination from './components/UI/Pagination/Pagination'
import ButtonArea from './components/ButtonArea/ButtonArea'
import MessageCreator from './containers/MessageCreator/MessageCreator'
import Loader from "./components/UI/Loader/Loader"
import $ from 'jquery'


class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            tableSchema: {
                CreationDate: {
                    Text: "Дата добавления",
                    IsSortableColumn: true,
                    IsCurrentSortColumn: false,
                    IsSortAsc: true
                },
                UserName: {
                    Text: "Имя пользователя",
                    IsSortableColumn: true,
                    IsCurrentSortColumn: false,
                    IsSortAsc: true
                },
                Email: {
                    Text: "E-mail",
                    IsSortableColumn: true,
                    IsCurrentSortColumn: false,
                    IsSortAsc: true
                },
                Text: {
                    Text: "Текст",
                    IsSortableColumn: false,
                    IsCurrentSortColumn: false,
                    IsSortAsc: true
                }
            },
            isCreateMsgMode: false,
            data: [],
            pageCount: 0,
            currentPage: 1,
            itemsOnPage: 2,
            loading: true
        }
    }

    getDataStateFromServer = async () => {
        let that = this;
        const data = {
            pageCount: this.state.pageCount,
            currentPage: this.state.currentPage,
            itemsOnPage: this.state.itemsOnPage,
            tableSchema: this.state.tableSchema
        };

        $.ajax({
            type: 'POST',
            dataType: 'json',
            cache: false,
            url: 'api/Messages/GetMessages',
            data: { json: JSON.stringify(data) },
            success: function (response) {
                const state = JSON.parse(response);
                that.setState({
                    pageCount: state.PageCount,
                    currentPage: state.CurrentPage,
                    itemsOnPage: state.ItemsOnPage,
                    data: state.Data,
                    loading: false
                });

                console.log(that.state);
            }
        });
    };

    async componentDidMount() {
        this.getDataStateFromServer();
    }

    sortTableColumn = (tableName) => {
        const tableSchema = this.state.tableSchema;

        Object.values(tableSchema).forEach(item => {

            if (item.Text === tableName) {

                if (!item.IsCurrentSortColumn) {
                    item.IsCurrentSortColumn = true;
                } else {
                    item.IsSortAsc = !item.IsSortAsc;
                }
            } else {
                item.IsCurrentSortColumn = false;
            }
        });

        this.setState({
            tableSchema: tableSchema
        }, () => {
            this.getDataStateFromServer();
        });
    };

    changeCurrPageByItemClick = number => {
        if (number !== this.state.currentPage) {
            this.setState({
                currentPage: number
            }, () => {
                this.getDataStateFromServer();
            });
        }
    };

    changeCurrPageByArrowItemClick = isPrevArrow => {
        let currentPage = this.state.currentPage;

        if (isPrevArrow) {
            currentPage = +currentPage - 1;
        } else {
            currentPage = +currentPage + 1;
        }

        this.setState({
            currentPage: currentPage
        }, () => {
            this.getDataStateFromServer();
        });
    };

    changeCreateMode = () => {
      const isCreateMsgMode = !this.isCreateMsgMode;
      this.setState({
          isCreateMsgMode
      });
    };

    cancelHandler = () => {
        this.setState({
            isCreateMsgMode: !this.state.isCreateMsgMode
        });
    };

    render() {

        return (
            <div className="App">
                {
                    !this.state.isCreateMsgMode
                        ? <React.Fragment>
                            {this.state.loading ? <Loader/> : null}
                            <ButtonArea
                                onAddBtnClick={this.changeCreateMode}
                            />

                            <Table
                                list={this.state.data}
                                tableSchema={this.state.tableSchema}
                                onColumnClick={this.sortTableColumn}
                            />

                            <Pagination
                                pageCount={this.state.pageCount}
                                currentPage={this.state.currentPage}
                                onItemClick={this.changeCurrPageByItemClick}
                                onArrowItemClick={this.changeCurrPageByArrowItemClick}
                            />
                        </React.Fragment>
                        : <MessageCreator
                            onCancelClick={this.cancelHandler}
                          />
                }

            </div>
        );
    }
}

export default App;
