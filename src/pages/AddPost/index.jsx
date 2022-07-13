import React from 'react';
import { Button, Paper, TextField } from '@mui/material';
import SimpleMDE from 'react-simplemde-editor';

import 'easymde/dist/easymde.min.css';
import styles from './AddPost.module.scss';
import { Upload } from '../../api/Upload';
import { Posts } from '../../api/Posts';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect } from 'react';
import useError from '../../hooks/useError';

export const AddPost = () => {
  const [value, setValue] = React.useState('');
  const [title, setTitle] = React.useState('');
  const [tags, setTags] = React.useState('');
  const [imageUrl, setImageUrl] = React.useState('');
  const handleError = useError();
  const imageRef = React.useRef();
  const navigate = useNavigate();
  const { id } = useParams();

  const onChange = React.useCallback((value) => {
    setValue(value);
  }, []);
  const onChangeImage = async (e) => {
    try {
      const response = await Upload.uploadImage(e);
      setImageUrl(response.url);
    } catch (error) {
      handleError(error.response.data.message);
    }
  };
  const onRemoveImage = () => {
    setImageUrl('');
  };
  const handleAddPost = async () => {
    if (!title || !imageUrl || !tags || !value) {
      handleError('Please, fill the from');
      return;
    }
    try {
      const req = {
        title,
        imageUrl,
        tags,
        text: value,
      };
      let response;
      if (id) {
        response = await Posts.updatePost(req, id);
        navigate(`/posts/${id}`);
      } else {
        response = await Posts.createPost(req);
        const pageId = response.data._id;
        navigate(`/posts/${pageId}`);
      }
    } catch (error) {
      handleError('Error during creating post');
    }
  };
  const options = React.useMemo(
    () => ({
      spellChecker: false,
      maxHeight: '400px',
      autofocus: true,
      placeholder: 'Write the text...',
      status: false,
      autosave: {
        enabled: true,
        uniqueId: 'editor',
        delay: 1000,
      },
    }),
    [],
  );
  useEffect(() => {
    if (id) {
      (async () => {
        const { data } = await Posts.getPost(id);
        setImageUrl(data.imageUrl);
        setTags(data.tags.join(','));
        setValue(data.text);
        setTitle(data.title);
        console.log(data);
      })();
    }
  }, [id]);

  return (
    <Paper style={{ padding: 30 }}>
      {imageUrl ? (
        <div className={styles.image}>
          <img
            style={{ width: 100 }}
            src={`${process.env.REACT_APP_URL_KEY}${imageUrl}`}
            alt="Uploaded"
          />
          <Button onClick={onRemoveImage} variant="contained" color="error" size="large">
            Delete
          </Button>
        </div>
      ) : (
        <Button onClick={() => imageRef.current.click()} variant="outlined" size="large">
          Upload image
        </Button>
      )}

      <input type="file" ref={imageRef} hidden onChange={onChangeImage} />
      <br />
      <br />
      <TextField
        classes={{ root: styles.title }}
        variant="standard"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Article's title..."
        fullWidth
      />
      <TextField
        value={tags}
        onChange={(e) => setTags(e.target.value)}
        classes={{ root: styles.tags }}
        variant="standard"
        placeholder="tag1,tag2"
        fullWidth
      />
      <SimpleMDE
        id="editor"
        className={styles.editor}
        value={value}
        onChange={onChange}
        options={options}
      />
      <div className={styles.buttons}>
        <Button onClick={handleAddPost} size="large" variant="contained">
          Publish
        </Button>
        <Button
          onClick={() => navigate('/')}
          variant="contained"
          sx={{ color: '#fff' }}
          color="red"
          size="large">
          Cancel
        </Button>
      </div>
    </Paper>
  );
};
