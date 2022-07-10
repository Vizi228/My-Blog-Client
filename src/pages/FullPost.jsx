import React, { useEffect, useState } from 'react';

import { Post } from '../components/Post';
import { SideBlock } from '../components/SideBlock';
import { SideComments } from '../components/SideComments';
import { AddComment } from '../components/AddComment/AddComment';
import { Posts } from '../api/Posts';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

export const FullPost = () => {
  const [post, setPost] = useState();
  const { id } = useParams();
  const { user } = useSelector((state) => ({
    user: state.userSlice.user,
  }));
  useEffect(() => {
    (async () => {
      const response = await Posts.getPost(id);
      setPost(response.data);
    })();
  }, [id]);
  return (
    <>
      {post && (
        <Post {...post} isEditable={user._id === post.user._id} isFullPost>
          {post.text}
        </Post>
      )}

      <SideBlock title="Комментарии">
        <SideComments
          items={[
            {
              user: {
                fullName: 'Вася Пупкин',
                avatarUrl: 'https://mui.com/static/images/avatar/1.jpg',
              },
              text: 'Это тестовый комментарий',
            },
            {
              user: {
                fullName: 'Иван Иванов',
                avatarUrl: 'https://mui.com/static/images/avatar/2.jpg',
              },
              text: 'When displaying three lines or more, the avatar is not aligned at the top. You should set the prop to align the avatar at the top',
            },
          ]}
        />
        <AddComment />
      </SideBlock>
    </>
  );
};
