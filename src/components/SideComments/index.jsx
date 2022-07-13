import React, { useCallback, useEffect } from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import { Comments } from '../../api/Comments';
import { useDispatch, useSelector } from 'react-redux';
import { removeComment } from '../../store/slice/commentSlice';
import styles from './SideComments.module.scss';
import { UpdateComment } from './UpdateComment';
import { fetchComments } from '../../services/comments';
import { Skeleton } from '@mui/material';
import { SideBlock } from '../SideBlock';
import Preloader from '../Preloader';
import useError from '../../hooks/useError';

export const SideComments = ({ postId }) => {
  const { items, isLoaded, user } = useSelector((state) => ({
    items: state.commentSlice.comments,
    isLoaded: state.commentSlice.isLoaded,
    user: state.userSlice.user,
  }));
  const dispatch = useDispatch();
  const handleError = useError();

  const getUser = (obj) => {
    if (obj?.user === user._id) {
      return user;
    }
    return obj.user;
  };
  const handleRemoveComment = useCallback(
    async (e, id) => {
      e.stopPropagation();
      try {
        await Comments.deleteComment(id);
        dispatch(removeComment(id));
      } catch (error) {
        handleError(error.response.data.message);
      }
    },
    [dispatch, handleError],
  );
  useEffect(() => {
    dispatch(fetchComments(postId || null));
  }, [dispatch, postId]);
  if (!isLoaded) {
    if (postId) {
      return <Preloader />;
    }
    return <Skeleton animation="wave" variant="rectangular" width={350} height={450} />;
  }
  return (
    <SideBlock title="Комментарии">
      <List>
        {items &&
          items.map((obj, i) => (
            <React.Fragment key={obj._id}>
              <ListItem className={styles.root} alignItems="flex-start">
                <ListItemAvatar>
                  <Avatar alt={getUser(obj).fullName} src={getUser(obj).avatarUrl} />
                </ListItemAvatar>
                <UpdateComment
                  handleRemoveComment={handleRemoveComment}
                  fullName={getUser(obj).fullName}
                  text={obj.text}
                  id={obj._id}
                  index={i}
                  postId={obj.postId}
                  isEditable={getUser(obj)._id === user._id && !!postId}
                />
              </ListItem>
              <Divider variant="inset" component="li" />
            </React.Fragment>
          ))}
      </List>
    </SideBlock>
  );
};
