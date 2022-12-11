import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { nanoid } from '@reduxjs/toolkit';
import { addNewPost, postAdded } from './postsSlice';

function AddPostForm() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [userId, setUserId] = useState('');
  const [addRequestStatus, setAddRequestStatus] = useState('idle');

  const dispatch = useDispatch();

  const users = useSelector(state => state.users);

  function onTitleChanged(event) {
    setTitle(event.target.value);
  }

  function onContentChanged(event) {
    setContent(event.target.value);
  }

  function onAuthorChanged(event) {
    setUserId(event.target.value);
  }

  const canSave = [title, content, userId].every(Boolean) && addRequestStatus === 'idle';

  async function onSavePostClicked(event) {
    event.preventDefault();

    if (canSave) {
      try {
        setAddRequestStatus('pending');
        await dispatch(addNewPost({ title, content, user: userId })).unwrap();
        setTitle('');
        setContent('');
        setUserId('');
      } catch (error) {
        console.error('Failed to save the post: ', error);
      }
      setAddRequestStatus('idle');
    }
  }


  const usersOptions = users.map(user => (
    <option key={user.id} value={user.id}>
      {user.name}
    </option>
  ))

  return (
    <section>
      <h2>Add a New Post</h2>
      <form>
        <label htmlFor="postTitle">Post Title: </label>
        <input
          type="text"
          id="postTitle"
          name="postTitle"
          value={title}
          onChange={onTitleChanged}
        />
        <label htmlFor="postAuthor">Author:</label>
        <select id="postAuthor" name="postAuthor" value={userId} onChange={onAuthorChanged}>
          <option value=""></option>
          {usersOptions}
        </select>
        <label htmlFor="postContent">Content:</label>
        <input
          type="text"
          id="postContent"
          name="postContent"
          value={content}
          onChange={onContentChanged}
        />
        <button type="submit" onClick={onSavePostClicked} diabled={!canSave}>Save Post</button>
      </form>
    </section>
  )
}

export { AddPostForm };
