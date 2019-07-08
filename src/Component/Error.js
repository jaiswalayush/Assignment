import React from 'react';

const Error = (props) => {
    return (
        <div className="jumbotron " style={{ height: '100vh' }}>
            <div className="text-center">
                {
                    props.error ? <h1 >uh oh.........<br /> An Error occurred......... :(</h1> :
                        <h1>uh oh.........<br /> No Posts to display :(</h1>
                }
            </div>
            <div className="text-center ">
                <button type="button" className="btn btn-outline-info btn-lg" onClick={props.retry}>Retry</button>
            </div>

        </div>

    );
}
export default Error;