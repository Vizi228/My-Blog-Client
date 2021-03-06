import styles from './Login.module.scss';
import React from 'react';
import { Button, Paper, TextField, Typography } from '@mui/material';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { loginSchema } from '../../utils/schemas/loginSchema';
import { useDispatch } from 'react-redux';
import { setUser } from '../../store/slice/userSlice';
import { useNavigate } from 'react-router-dom';
import { Auth } from '../../api/Authorization';
import useError from '../../hooks/useError';

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleError = useError();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: 'onChange',
    resolver: yupResolver(loginSchema),
  });
  const onSubmit = async (res) => {
    try {
      const response = await Auth.login(res);
      dispatch(setUser(response.data));
      navigate('/', { replace: true });
    } catch (e) {
      handleError('Wrong password or login');
    }
  };
  return (
    <Paper classes={{ root: styles.root }}>
      <Typography classes={{ root: styles.title }} variant="h5">
        Login to account
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
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
          Войти
        </Button>
      </form>
    </Paper>
  );
};

export default Login;
