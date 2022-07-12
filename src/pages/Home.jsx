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
import { Tags } from '../api/Tags';
import { useNavigate, useParams } from 'react-router-dom';

export const Home = () => {
  const [posts, setPosts] = useState([]);
  const [tags, setTags] = useState([]);
  const [tabValue, setTabValue] = useState(0);
  const navigate = useNavigate();
  const { id } = useParams();
  const { user } = useSelector((state) => ({
    user: state.userSlice.user,
  }));

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

  useEffect(() => {
    (async () => {
      try {
        if (id) {
          const postsResponse = await Posts.getTagsPosts(id, tabValue);
          setPosts(postsResponse.data);
        } else {
          const postsResponse = await Posts.getAllPosts(tabValue);
          setPosts(postsResponse.data);
        }
        const tagsResponse = await Tags.getTags();
        setTags(tagsResponse.data);
      } catch (error) {
        alert('Ошибка при загрузке страницы');
        console.log(error);
      }
    })();
  }, [id, tabValue]);

  useEffect(() => {
    (async () => {
      try {
        const tagsResponse = await Tags.getTags();
        setTags(tagsResponse.data);
      } catch (error) {
        alert('Ошибка при загрузке страницы');
        console.log(error);
      }
    })();
  }, []);
  return (
    <>
      <Tabs
        style={{ marginBottom: 15 }}
        onChange={(e, newValue) => setTabValue(newValue)}
        value={tabValue}
        aria-label="basic tabs example">
        <Tab label="New" />
        <Tab label="Popular" />
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
              {tags &&
                tags.map((name) => (
                  <ListItem onClick={() => navigate(`/posts/tags/${name}`)} disablePadding>
                    <ListItemButton>
                      <ListItemIcon>
                        <TagIcon />
                      </ListItemIcon>
                      <ListItemText primary={`${name}`} />
                    </ListItemButton>
                  </ListItem>
                ))}
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
