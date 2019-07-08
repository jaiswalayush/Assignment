import React from 'react';
import PostData from './PostData'



const PostsTable = (props) => {

    let PostsArray = props.posts.map(post =>
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
            reset = {props.reset}/>
    )

    return (
        <div className="table-responsive">
            <table className="table table-striped table-hover mt-2 mb-2">
                <thead className="thead-dark sticky-top" >
                    <tr>
                        <th className="text-center">Post Title</th>
                        <th className="text-center">Post Body</th>
                        <th className="text-center">Action</th>
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