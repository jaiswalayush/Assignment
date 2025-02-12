import React, { Component } from 'react';
import PostsTable from '../Component/PostsTable';
import Api from '../Services/PostsEndpoint';
import Error from '../Component/Error';


class Post extends Component {
    state = {
        posts: [],
        isError: false
    }

    apiHelper = new Api();
    originalValue = [];

    componentDidMount() {
        this.apiHelper.get()
            .then(response => {
                const modifiedPosts = response.data.map(singlePost => {
                    return {
                        ...singlePost,
                        isEditable: false,
                        isDirty: false
                    }
                })
                this.setState({ posts: modifiedPosts, isError: false })
            })
            .catch(er => {
                this.setState({ isError: true });
            });
    }

    isEditableHandler = (id) => {

        //To retain the previous value of edited post for Reset action
        this.originalValue.push(...this.state.posts.filter(x => x.id === id));

        const editablePosts = this.state.posts.map(post => post.id === id ? { ...post, isEditable: true } : post);
        this.setState({ posts: editablePosts });
    }

    onChangeHandler = (event, isBodyChanged) => {
        const id = +event.target.id;
        const value = event.target.value;

        //Identifies whether title or body of post is changed and update its value property accordingly
        const changedData = isBodyChanged ?
            this.state.posts.map(post => post.id === id ? { ...post, body: value, isDirty: true } : post) :
            this.state.posts.map(post => post.id === id ? { ...post, title: value, isDirty: true } : post);

        this.setState({ posts: changedData });
    }

    onSaveHandler = (id) => {
        const post = this.state.posts.filter(post => post.id === id);
        const data = post.pop();
        const patchData = { title: data.title, body: data.body, userId: data.userId }

        this.apiHelper.patch(id, patchData)
            .then(response => {
                const successData = this.state.posts.map(post => post.id === response.data.id ? { ...post, isEditable: false, isDirty: false } : post);	//Modifies post collection to reflect edited data
                this.setState({ posts: successData, isError: false });
                this.originalValue.splice(this.originalValue.findIndex(val => val.id === id), 1);
            }).catch(er => {
                this.setState({ isError: true });
            })
    }

    onDeleteHandler = (id) => {
        const post = this.state.posts.filter(post => post.id === id);
        const data = post.pop();
        const deleteData = { title: data.title, body: data.body, userId: data.userId };
        const index = this.state.posts.findIndex(post => post.id === id);
        const successData = this.state.posts;
        const updateOriginalValue = () => this.originalValue.splice(index, 1);
        successData.splice(index, 1);	//Modified post collection by removing deleted post

        this.apiHelper.delete(id, deleteData)
            .then(response => {
                this.setState({ posts: successData, isError: false });
                updateOriginalValue();
            }).catch(er => {
                this.setState({ isError: true });
            })
    }

    onResetHandler = (id) => {
        const originalValue = this.originalValue.filter(val => val.id === id);
        if (originalValue) {
            const modifiedArr = this.state.posts.map(post => post.id === id ? originalValue[0] : post);
            this.setState({ posts: modifiedArr });
            this.originalValue.splice(this.originalValue.findIndex(val => val.id === id), 1);
        }
    }

    onRetry = () => {
        const data = this.state.posts;
        this.setState({ posts: data, isError: false });
    }

    render() {
        return (
            this.state.isError ? <Error error={this.state.isError} retry={this.onRetry} /> :
                this.state.posts.length > 0 ?
                    <PostsTable
                        posts={this.state.posts}
                        edit={this.isEditableHandler}
                        changed={this.onChangeHandler}
                        save={this.onSaveHandler}
                        delete={this.onDeleteHandler}
                        reset={this.onResetHandler} />
                    : <Error error={false} retry={this.onRetry} />

        );
    }
}
export default Post;