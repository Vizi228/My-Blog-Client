import React from 'react';
import clsx from 'clsx';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Clear';
import EditIcon from '@mui/icons-material/Edit';
import EyeIcon from '@mui/icons-material/RemoveRedEyeOutlined';
import CommentIcon from '@mui/icons-material/ChatBubbleOutlineOutlined';

import styles from './Post.module.scss';
import { UserInfo } from '../UserInfo';
import { useNavigate, Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import { Posts } from '../../api/Posts';
import useError from '../../hooks/useError';

export const Post = ({
  _id,
  title,
  createdAt,
  imageUrl,
  user,
  viewsCount,
  commentsCount,
  tags,
  children,
  isFullPost,
  isEditable,
  deletePostItem,
}) => {
  const navigate = useNavigate();
  const handleError = useError();
  const onRedirect = () => {
    if (!isFullPost) navigate(`/posts/${_id}`);
  };
  const onRemovePost = (e) => {
    e.stopPropagation();
    deletePostItem(_id);
  };
  const onRemoveFullPost = async (e) => {
    try {
      e.stopPropagation();
      await Posts.deletePost(_id);
      navigate('/');
    } catch (error) {
      handleError('Error during removing post');
    }
  };
  return (
    <div onClick={onRedirect} className={clsx(styles.root, { [styles.rootFull]: isFullPost })}>
      {isEditable && (
        <div className={styles.editButtons}>
          <Link to={`/posts/${_id}/edit`}>
            <IconButton color="primary">
              <EditIcon />
            </IconButton>
          </Link>
          {isFullPost ? (
            <IconButton onClick={(e) => onRemoveFullPost(e)}>
              <DeleteIcon />
            </IconButton>
          ) : (
            <IconButton onClick={(e) => onRemovePost(e)} color="secondary">
              <DeleteIcon />
            </IconButton>
          )}
        </div>
      )}
      <img
        className={clsx(styles.image, { [styles.imageFull]: isFullPost })}
        src={`${process.env.REACT_APP_URL_KEY}${imageUrl}`}
        alt={title}
      />
      <div className={styles.wrapper}>
        <UserInfo {...user} additionalText={createdAt} />
        <div className={styles.indention}>
          <h2 className={clsx(styles.title, { [styles.titleFull]: isFullPost })}>
            {isFullPost ? title : <Link to={`/posts/${_id}`}>{title}</Link>}
          </h2>
          <ul className={styles.tags}>
            {tags &&
              tags.map((name) => (
                <li key={name}>
                  <Link to={`/tag/${name}`}>#{name}</Link>
                </li>
              ))}
          </ul>
          {children && <ReactMarkdown className={styles.content} children={children} />}
          <ul className={styles.postDetails}>
            <li>
              <EyeIcon />
              <span>{viewsCount}</span>
            </li>
            <li>
              <CommentIcon />
              <span>{commentsCount}</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};
