import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { selectPostById } from './postsSlice';

function SinglePostPage(props) {
  const { match } = props;
  const { postId } = match.params;

  const post = useSelector(state => selectPostById(state, postId));

  if (!post) {
    return (
      <section>
        <h2>Post not found!</h2>
      </section>
    )
  }

  return (
    <section>
      <article>
        <h2>{post.title}</h2>
        <p className="post-content">{post.content}</p>
        <Link to={`/editPost/${post.id}`}>Edit Post</Link>
      </article>
    </section>
  )
}

export { SinglePostPage };
