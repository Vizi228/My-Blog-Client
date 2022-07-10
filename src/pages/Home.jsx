import React, { useEffect } from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Grid from '@mui/material/Grid';
import { Post } from '../components/Post';
import { SideBlock } from '../components/SideBlock';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import TagIcon from '@mui/icons-material/Tag';
import ListItemText from '@mui/material/ListItemText';
import { SideComments } from '../components/SideComments';
import { useState } from 'react';
import { Posts } from '../api/Posts';
import { useSelector } from 'react-redux';
import { useCallback } from 'react';

export const Home = () => {
  const [posts, setPosts] = useState([]);
  const { user } = useSelector((state) => ({
    user: state.userSlice.user,
  }));
  useEffect(() => {
    (async () => {
      const response = await Posts.getAllPosts();
      setPosts(response.data);
    })();
  }, []);

  const deletePostItem = useCallback(
    async (id) => {
      try {
        setPosts(posts.filter((item) => item._id !== id));
        await Posts.deletePost(id);
      } catch (error) {
        alert('Error during removing post');
      }
    },
    [posts],
  );

  return (
    <>
      <Tabs style={{ marginBottom: 15 }} value={0} aria-label="basic tabs example">
        <Tab label="Новые" />
        <Tab label="Популярные" />
      </Tabs>
      <Grid container spacing={4}>
        <Grid xs={8} item>
          {posts &&
            posts.map((item) => (
              <Post
                {...item}
                deletePostItem={deletePostItem}
                isEditable={user._id === item.user._id}
              />
            ))}
        </Grid>
        <Grid xs={4} item>
          <SideBlock title="Тэги">
            <List>
              <ListItem disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    <TagIcon />
                  </ListItemIcon>
                  <ListItemText primary="react" />
                </ListItemButton>
              </ListItem>
            </List>
          </SideBlock>
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
          </SideBlock>
        </Grid>
      </Grid>
    </>
  );
};
