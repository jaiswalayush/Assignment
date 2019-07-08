import React from 'react';



const PostData = (props) => {

    const saveButtonStyle = "btn btn-outline-success btn-block";
    const editButtonStyle = "btn btn-outline-primary btn-block";
    const resetButtonStyle = "btn btn-outline-warning btn-block";
    const cancelButtonstyle = "btn btn-outline-secondary btn-block";
    const hideCancelButton = "invisible";
    const deleteButtonStyle = "btn btn-outline-danger btn-block";
    const editableBoxStyle = "form-control";
    const textAlignStyle = "align-top";

    return (<tr>
        <td className={textAlignStyle}>
            {props.isEditable ?
                <textarea
                    className={editableBoxStyle}
                    rows="5"
                    id={props.id}
                    onChange={(event) => props.changed(event, false)}
                    value={props.title}></textarea>
                : props.title
            }
        </td>
        <td className={textAlignStyle}>
            {props.isEditable ?
                <textarea
                    className={editableBoxStyle}
                    rows="5"
                    onChange={(event) => props.changed(event, true)}
                    value={props.body}
                    id={props.id}></textarea>
                : props.body
            }

        </td>
        <td>
            <button type="button"
                className={props.isDirty ? saveButtonStyle : editButtonStyle} //Identifies style to be applied to button as per its dirty property
                onClick={() => props.isDirty ? props.save(props.id) : props.edit(props.id)}>
                {props.isDirty ? 'Save' : 'Edit'}
            </button>
            <button type="button"
                className={deleteButtonStyle}
                onClick={() => props.delete(props.id)}>
                Delete
            </button>
            <button type="button"
                className={props.isEditable ? props.isDirty ? resetButtonStyle : cancelButtonstyle : hideCancelButton}
                onClick={() => props.reset(props.id)}>
                {props.isDirty ? 'Reset' : 'Cancel'}
            </button>
        </td>
    </tr>)
}
export default PostData;