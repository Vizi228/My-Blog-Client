import React from 'react';

import styles from './AddComment.module.scss';

import TextField from '@mui/material/TextField';
import { Avatar, Button } from '@mui/material';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { Comments } from '../../api/Comments';

export const AddComment = ({ postId }) => {
  const [value, setValue] = useState('');
  const { user } = useSelector((state) => ({
    user: state.userSlice.user,
  }));

  const onAddComment = async () => {
    try {
      const req = {
        text: value.trim(),
        postId,
      };
      await Comments.create(req);
      setValue('');
    } catch (error) {
      alert(error.response.data.message);
      console.log(error);
    }
  };
  return (
    <>
      <div className={styles.root}>
        <Avatar classes={{ root: styles.avatar }} src={user.avatarUrl} />
        <div className={styles.form}>
          <TextField
            label="Написать комментарий"
            variant="outlined"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            maxRows={10}
            multiline
            fullWidth
          />
          <Button onClick={onAddComment} variant="contained">
            Отправить
          </Button>
        </div>
      </div>
    </>
  );
};
