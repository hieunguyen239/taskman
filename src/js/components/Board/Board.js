import React, {Component} from 'react';
import { connect } from "react-redux";
import Col from '../Col/Col';
import Modal from '../Modal/Modal';
import './css/board.css';

import showModalAction from '../../redux/actions/ShowModaAction';
import addCardAction from '../../redux/actions/AddCardAction';

class Board extends Component{
    checkShowModal = (isModalShow) => {
        let $body = document.getElementsByTagName('body')[0];
        if(isModalShow){
            $body.classList.add('with-modal-shown');
        }else{
            $body.classList.remove('with-modal-shown');
        }
    }

    toggleModal = () =>{
        let isModalShow = !this.props.tasks.isModalShow;
        this.checkShowModal(isModalShow);
        this.props.showModalAction({isModalShow});
    }

    submitSaveTask = (data) => {
        this.props.addCardAction(data);
    }

    renderCard = () => {
        let {tasks} = this.props;
        const cols = [
            {
                id: 1,
                name: 'To Do'
            },
            {
                id: 2,
                name: 'Complete'
            }
        ];

        return cols.map((col, index) => {
            return(
                <li key={index}>
                    <Col name={col.name} id={col.id} cards={tasks.cards} toggleModal={this.toggleModal} />
                </li>
            )
        });
    }

    createClock(){
        let clock = document.getElementById('date-time');
        let date = new Date(),
            year = date.getFullYear(),
            month = date.getMonth(),
            months = ['January', 'February', 'March', 'April', 'May', 'June', 'Jully', 'August', 'September', 'October', 'November', 'December'],
            d = date.getDate(),
            day = date.getDay(),
            days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
            h = date.getHours(),
            m = date.getMinutes(),
            s = date.getSeconds();
            if(h < 10){
                h = "0" + h;
            }
            if(m < 10){
                m = "0" + m;
            }
            if(s < 10){
                s = "0" + s;
            }
            let result = '<span class="days">'+days[day]+' '+months[month]+' '+d+' '+year+'</span><span class="hours">'+h+':'+m+':'+s+'</span>';
            clock.innerHTML = result;
           setInterval(this.createClock, 1000);
        
    }

    render(){
        const col = this.renderCard();
        const tasks = this.props.tasks;
        this.checkShowModal(tasks.isModalShow);
        return(
            <div className="content">
                <div id="date-time">
                </div>
                <ul className="col-list">
                    {col}
                </ul>
                {<div className={tasks.isModalShow ? "modal-wrapper-shown" : "modal-wrapper-hide"}><Modal title="Create a new Task" toggleModal={this.toggleModal} submitSaveTask={this.submitSaveTask}/></div>}
            </div>
           
        )
    }
    componentDidMount(){
        this.createClock();
    }
}

function mapStateToProps(state, props) {
    return {
        tasks: state.boardReducer
    };
}

function mapDispatchToProps(dispatch){
    return {
        showModalAction: (payload) => dispatch(showModalAction(payload)),
        addCardAction: (payload) => dispatch(addCardAction(payload))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Board);