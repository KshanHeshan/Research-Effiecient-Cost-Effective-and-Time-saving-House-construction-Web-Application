import React from 'react';

export default function Error({error}) {
    // Error message for input validations validtions
    return (
        <div className="text-danger">
            {error}
        </div>
    )
}
