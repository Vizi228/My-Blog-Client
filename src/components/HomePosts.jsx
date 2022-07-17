import { Button, Skeleton } from '@mui/material';
import React, { useCallback, useEffect, useState } from 'react';
import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { Posts } from '../api/Posts';
import useError from '../hooks/useError';
import { getQuery } from '../utils/helpers/getQuery';
import { Post } from './Post';

export default function HomePosts({ tabValue, id, limit, setLimit }) {
  const [posts, setPosts] = useState([]);
  const [isLoaded, setLoaded] = useState(true);
  const [searchParams] = useSearchParams();
  const allSearchParams = useMemo(() => Object.fromEntries([...searchParams]), [searchParams]);
  const handleError = useError();
  const { user, comments } = useSelector((state) => ({
    user: state.userSlice.user,
    comments: state.commentSlice.comments,
  }));
  const deletePostItem = useCallback(
    async (id) => {
      try {
        setPosts(posts.filter((item) => item._id !== id));
        await Posts.deletePost(id);
      } catch (error) {
        handleError('Error during removing post');
      }
    },
    [posts, handleError],
  );
  const handleLimit = () => {
    if (limit === posts.length) {
      setLimit((prev) => prev + 5);
    }
  };
  useEffect(() => {
    (async () => {
      try {
        setLoaded(false);
        if (id) {
          const postsResponse = await Posts.getTagsPosts(id, getQuery(allSearchParams));
          setPosts(postsResponse.data);
        } else {
          const postsResponse = await Posts.getAllPosts(getQuery(allSearchParams));
          setPosts(postsResponse.data);
        }
      } catch (error) {
        handleError('Error during loading page');
      } finally {
        setLoaded(true);
      }
    })();
  }, [id, tabValue, handleError, allSearchParams]);
  if (!isLoaded) {
    return [...Array(5)].map((item, i) => (
      <div key={i} style={{ marginTop: 15 }}>
        <Skeleton animation="wave" variant="rectangular" width={700} height={500} />
      </div>
    ));
  }
  return (
    <>
      {posts &&
        posts.map((post) => (
          <Post
            {...post}
            key={post._id}
            commentsCount={comments.filter((item) => item.postId === post._id).length}
            deletePostItem={deletePostItem}
            isEditable={user._id === post.user._id}
          />
        ))}
      {limit === posts.length && (
        <Button onClick={handleLimit} variant="contained">
          Get another posts
        </Button>
      )}
    </>
  );
}
