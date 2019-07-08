import React from 'react';

const PostData = (props) =>
    <tr>
        <td className="align-top">
            {props.isEditable ?
                <textarea
                    className="form-control"
                    rows="5" id={props.id}
                    onChange={(event) => props.changed(event, false)}
                    value={props.title}></textarea>
                : props.title
            }
        </td>
        <td className="align-top">
            {props.isEditable ?
                <textarea
                    className="form-control"
                    rows="5"
                    onChange={(event) => props.changed(event, true)}
                    value={props.body}
                    id={props.id}></textarea>
                : props.body
            }

        </td>
        <td>
            <button type="button"
                className={props.isDirty ? "btn btn-outline-success btn-block" : "btn btn-outline-primary btn-block"} //Identifies style to be applied to button as per its dirty property 
                onClick={() => props.isDirty ? props.save(props.id) : props.edit(props.id)}>
                {props.isDirty ? 'Save' : 'Edit'}
            </button>
            <button type="button"
                className="btn btn-outline-danger btn-block"
                onClick={() => props.delete(props.id)}>
                Delete
            </button>
            <button type="button"
                className={props.isEditable ? props.isDirty ? "btn btn-outline-warning btn-block visible" : "btn btn-outline-secondary btn-block visible" : "btn btn-outline-warning btn-block invisible"}
                onClick={() => props.reset(props.id)}>
                {props.isDirty ? 'Reset' : 'Cancel'}
            </button>
        </td>
    </tr>

export default PostData;