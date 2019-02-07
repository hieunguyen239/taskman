import React from 'react';
import './css/modal.css';

const Modal = (props) => {
    function saveTask(e){
        const title = document.getElementById('inp-card-title').value;
        const content = document.getElementById('inp-card-content').value;

        if(title && content){
            e.preventDefault();
            const data = {title, content};
            props.submitSaveTask(data);
        }
    }
    return(
        <div className="modal-container">
            <div className="modal-title">
                {props.title}
            </div>
            <div className="modal-content">
              <form id="frm-add-card">
                <div className="input-box">
                        <label htmlFor="input-label">Task Title</label>
                        <input name="inp-card-title" id="inp-card-title" type="text" maxLength="100" required/>
                    </div>
                    <div className="input-box">
                        <label htmlFor="input-label">Task Content</label>
                        <textarea name="inp-card-content" id="inp-card-content" required/>
                    </div>
                    <div className="buttons-set">
                        <div className="submit-box">
                            <input type="submit" value="Save" id="submit-add-card" onClick={saveTask}/>
                        </div>  
                        <div className="cancel-container">
                            <button className="cancel-btn" onClick={props.toggleModal}>Cancel</button>
                        </div>
                    </div>
              </form>
            </div>
        </div>
    )
}

export default Modal;