import React from 'react';
import { useSelector } from 'react-redux';

function PostAuthor(props) {
  const { userId } = props;

  const author = useSelector(state => state.users.find(user => user.id === userId));

  return <span>by {author ? author.name : 'Unknown author'}</span>
}

export { PostAuthor };
