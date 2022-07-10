import React from 'react';
import { Avatar, Button, Paper, TextField, Typography } from '@mui/material';
import { useForm } from 'react-hook-form';
import styles from './Registration.module.scss';
import { yupResolver } from '@hookform/resolvers/yup';
import { registerSchema } from '../../utils/schemas/registerSchema';
import { useDispatch } from 'react-redux';
import { setUser } from '../../store/slice/userSlice';
import { useNavigate } from 'react-router-dom';
import { Auth } from '../../api/Authorization';

export const Registration = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
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
      const response = await Auth.register(res);
      dispatch(setUser(response.data));
      navigate('/', { replace: true });
    } catch (error) {
      alert(error);
    }
  };

  return (
    <Paper classes={{ root: styles.root }}>
      <Typography classes={{ root: styles.title }} variant="h5">
        Создание аккаунта
      </Typography>
      <div className={styles.avatar}>
        <Avatar sx={{ width: 100, height: 100 }} />
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField
          className={styles.field}
          error={Boolean(errors.fullName?.message)}
          helperText={errors.fullName?.message}
          name="fullName"
          label="Полное имя"
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
          label="Пароль"
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