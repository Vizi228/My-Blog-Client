import React from 'react';
import TextField from '@mui/material/TextField';
import ListItemText from '@mui/material/ListItemText';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Clear';
import EditIcon from '@mui/icons-material/Edit';
import styles from './SideComments.module.scss';
import { useState } from 'react';
import { Comments } from '../../api/Comments';
import { useDispatch } from 'react-redux';
import { updateComment } from '../../store/slice/commentSlice';

export const UpdateComment = ({
  fullName,
  text,
  isEditable,
  id,
  handleRemoveComment,
  postId,
  index,
}) => {
  const [isChange, setIsChange] = useState(false);
  const [value, setValue] = useState(text);
  const dispatch = useDispatch();

  const editComment = async () => {
    try {
      await Comments.updateComment({ text: value, postId: postId }, id);
      dispatch(updateComment({ id: index, text: value }));
      setIsChange(false);
    } catch (error) {
      alert(error);
      console.log(error);
    }
  };

  return (
    <>
      {isEditable && (
        <div className={styles.editButtons}>
          <IconButton onClick={(e) => setIsChange(!isChange)} color="primary">
            <EditIcon />
          </IconButton>
          <IconButton onClick={(e) => handleRemoveComment(e, id)} color="secondary">
            <DeleteIcon />
          </IconButton>
        </div>
      )}
      {isChange ? (
        <div className={styles.form}>
          <TextField
            label="Написать комментарий"
            variant="outlined"
            value={value}
            sx={{ width: '70%' }}
            onChange={(e) => setValue(e.target.value)}
            maxRows={10}
            multiline
            fullWidth
          />
          <Button onClick={editComment} variant="contained">
            Отправить
          </Button>
        </div>
      ) : (
        <ListItemText primary={fullName} secondary={text} />
      )}
    </>
  );
};
