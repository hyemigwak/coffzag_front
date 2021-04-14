import React from 'react'

const Comment = (props) => {
    return (
        <div>
            {props.contents}
            {props.username}
            {props.createdAt}
        </div>
    )
}

Comment.defaultProps = {
    contents: "좋네요",
    name: "경미니",
    insert_dt: "2021-04-14 10:00:00",
  };

export default Comment
