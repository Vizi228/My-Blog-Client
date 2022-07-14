import React from 'react';

import styles from './AddComment.module.scss';

import TextField from '@mui/material/TextField';
import { Avatar, Button } from '@mui/material';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Comments } from '../../api/Comments';
import { addComment } from '../../store/slice/commentSlice';
import useError from '../../hooks/useError';

export const AddComment = ({ postId }) => {
  const [value, setValue] = useState('');
  const [isAdded, setIsAdded] = useState(true);
  const dispatch = useDispatch();
  const handleError = useError();
  const { user } = useSelector((state) => ({
    user: state.userSlice.user,
  }));

  const onAddComment = async () => {
    if (!value) {
      handleError('Fill the field');
      return;
    }
    try {
      const req = {
        text: value.trim(),
        postId,
      };
      setIsAdded(false);
      const { data } = await Comments.create(req);
      dispatch(addComment(data));
      setValue('');
      setIsAdded(true);
    } catch (error) {
      handleError(error.response.data.message);
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
          <Button disabled={!isAdded} onClick={onAddComment} variant="contained">
            Отправить
          </Button>
        </div>
      </div>
    </>
  );
};
