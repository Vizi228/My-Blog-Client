import React, { useRef } from 'react';
import { Avatar, Button, Paper, TextField, Typography } from '@mui/material';
import { useForm } from 'react-hook-form';
import styles from './Registration.module.scss';
import { yupResolver } from '@hookform/resolvers/yup';
import { registerSchema } from '../../utils/schemas/registerSchema';
import { useDispatch } from 'react-redux';
import { setUser } from '../../store/slice/userSlice';
import { useNavigate } from 'react-router-dom';
import { Auth } from '../../api/Authorization';
import { Upload } from '../../api/Upload';
import useError from '../../hooks/useError';

const Registration = () => {
  const [imageUrl, setImageUrl] = React.useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleError = useError();
  const imageRef = useRef();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: 'onChange',
    resolver: yupResolver(registerSchema),
  });
  const onSubmit = async (res) => {
    try {
      if (!imageUrl) {
        handleError('Please, put the image');
        return;
      }
      const obj = {
        ...res,
        avatarUrl: `${process.env.REACT_APP_URL_KEY}${imageUrl}`,
      };
      const response = await Auth.register(obj);
      dispatch(setUser(response.data));
      navigate('/', { replace: true });
    } catch (error) {
      handleError(error.response.data.message);
    }
  };
  const onChangeImage = async (e) => {
    try {
      const response = await Upload.uploadProfileImage(e);
      setImageUrl(response.url);
    } catch (error) {
      handleError(error.response.data.message);
    }
  };
  return (
    <Paper classes={{ root: styles.root }}>
      <Typography classes={{ root: styles.title }} variant="h5">
        Create account
      </Typography>
      <div className={styles.avatar}>
        <Avatar
          onClick={() => imageRef.current.click()}
          src={`${process.env.REACT_APP_URL_KEY}${imageUrl}`}
          sx={{ width: 100, height: 100 }}
        />
        <input type="file" ref={imageRef} hidden onChange={onChangeImage} />
        {imageUrl && (
          <Button type="submit" size="large" onClick={() => setImageUrl('')} variant="contained">
            Cancel
          </Button>
        )}
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField
          className={styles.field}
          error={Boolean(errors.fullName?.message)}
          helperText={errors.fullName?.message}
          name="fullName"
          label="Fullname"
          fullWidth
          {...register('fullName')}
        />
        <TextField
          className={styles.field}
          error={Boolean(errors.email?.message)}
          helperText={errors.email?.message}
          name="email"
          label="E-Mail"
          fullWidth
          {...register('email')}
        />
        <TextField
          className={styles.field}
          name="password"
          error={Boolean(errors.password?.message)}
          helperText={errors.password?.message}
          type="password"
          label="Password"
          fullWidth
          {...register('password')}
        />
        <Button type="submit" size="large" variant="contained" fullWidth>
          Login
        </Button>
      </form>
    </Paper>
  );
};
export default Registration;
