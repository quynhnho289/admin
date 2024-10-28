import React from 'react';

function Loading(props) {
    return (
        <div className="text-center">
            <div class="spinner-border text-warning text-center" role="status">
                <span class="sr-only">Loading...</span>
            </div>
        </div>
    );
}

export default Loading;