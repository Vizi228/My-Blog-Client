import React, { useEffect } from 'react';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import TagIcon from '@mui/icons-material/Tag';
import ListItemText from '@mui/material/ListItemText';
import { useState } from 'react';
import { Tags } from '../api/Tags';
import { useNavigate } from 'react-router-dom';
import { SideBlock } from './SideBlock';
import { List, Skeleton } from '@mui/material';
import useError from '../hooks/useError';
import { memo } from 'react';

function HomeTags() {
  const [tags, setTags] = useState([]);
  const [isLoaded, setLoaded] = useState(true);
  const navigate = useNavigate();
  const handleError = useError();

  useEffect(() => {
    (async () => {
      try {
        setLoaded(false);
        const tagsResponse = await Tags.getTags();
        setTags(tagsResponse.data);
      } catch (error) {
        handleError('Error during loading page');
      } finally {
        setLoaded(true);
      }
    })();
  }, [handleError]);
  if (!isLoaded) {
    return (
      <div style={{ marginBottom: 15 }}>
        <Skeleton animation="wave" variant="rectangular" width={350} height={450} />
      </div>
    );
  }
  return (
    <SideBlock title="Tags">
      <List>
        {tags &&
          tags.map((name) => (
            <ListItem key={name} onClick={() => navigate(`/posts/tags/${name}`)} disablePadding>
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
  );
}

export default memo(HomeTags);
