import React, { useEffect, useState } from 'react';

import { Post } from '../components/Post';
import { SideBlock } from '../components/SideBlock';
import { SideComments } from '../components/SideComments';
import { AddComment } from '../components/AddComment/AddComment';
import { Posts } from '../api/Posts';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Skeleton from '@mui/material/Skeleton';
import useError from '../hooks/useError';

const FullPost = () => {
  const [post, setPost] = useState();
  const [isLoaded, setIsLoaded] = useState(true);
  const { id } = useParams();
  const handleError = useError();
  const { user, comments } = useSelector((state) => ({
    user: state.userSlice.user,
    comments: state.commentSlice.comments,
  }));
  useEffect(() => {
    (async () => {
      try {
        setIsLoaded(false);
        const response = await Posts.getPost(id);
        setPost(response.data);
      } catch (error) {
        handleError(error.response.data.message);
      } finally {
        setIsLoaded(true);
      }
    })();
  }, [id, handleError]);
  if (!isLoaded) {
    return <Skeleton animation="wave" variant="rectangular" width={'80vw'} height={'80vh'} />;
  }
  return (
    <>
      {post && (
        <Post
          commentsCount={comments.filter((item) => item.postId === post._id).length}
          {...post}
          isEditable={user._id === post.user._id}
          isFullPost>
          {post.text}
        </Post>
      )}
      <SideComments postId={id} />
      <SideBlock>
        <AddComment postId={id} />
      </SideBlock>
    </>
  );
};

export default FullPost;
