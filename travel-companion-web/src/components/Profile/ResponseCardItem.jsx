import React from 'react';

const ResponseCardItem = ({item, setDeleteConfirmVisible}) => {
    return (
        <div className="card mb-3">
            <div className="card-body">
                {item.post != null &&
                    <h5 className="card-title">{item.post.title}</h5>
                }
                <p className="card-text">{item.comment}</p>
            </div>
        </div>
    );
};

export default ResponseCardItem;