import React from 'react';
import { useDispatch } from 'react-redux';

import { reactionAdded } from './postsSlice';

const reactionEmoji = {
  thumbsUp: '👍',
  hooray: '🎉',
  heart: '❤️',
  rocket: '🚀',
  eyes: '👀'
}

function ReactionButtons(props) {
  const { post } = props;

  const dispatch = useDispatch();

  function addReaction(name) {
    dispatch(reactionAdded({ id: post.id, reaction: name }));
  }

  return (
    <div>
      {
        Object.entries(reactionEmoji).map(([name, emoji]) => (
          <button key={name} type="button" className="muted-button reaction-button" onClick={() => addReaction(name)}>
            {emoji} {post.reactions[name]}
          </button>
        ))
      }
    </div>
  )
}

export { ReactionButtons };
