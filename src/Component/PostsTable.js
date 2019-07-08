import React from 'react';
import PostData from './PostData'



const PostsTable = (props) => {

    const PostsArray = props.posts.map(post =>
        <PostData
            key={post.id}
            userId={post.userId}
            title={post.title}
            body={post.body}
            isEditable={post.isEditable}
            id={post.id}
            edit={props.edit}
            changed={props.changed}
            isDirty={post.isDirty}
            save={props.save}
            delete={props.delete}
            reset={props.reset} />
    )

    const textAlignStyle = "text-center";

    return (
        <div className="table-responsive">
            <table className="table table-striped table-hover mt-2 mb-2">
                <thead className="thead-dark sticky-top" >
                    <tr>
                        <th className={textAlignStyle}>Post Title</th>
                        <th className={textAlignStyle}>Post Body</th>
                        <th className={textAlignStyle}>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {PostsArray}
                </tbody>
            </table>
        </div>
    )
}


export default PostsTable;