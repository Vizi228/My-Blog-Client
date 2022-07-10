import React from 'react';
import Button from '@mui/material/Button';

import styles from './Header.module.scss';
import { Container } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { removeUser } from '../../store/slice/userSlice';

export const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuth } = useSelector((state) => ({
    isAuth: state.userSlice.isAuth,
  }));

  const handleLogout = () => {
    localStorage.removeItem('mern-token');
    dispatch(removeUser());
  };

  return (
    <div className={styles.root}>
      <Container maxWidth="lg">
        <div className={styles.inner}>
          <Link className={styles.logo} to="/">
            <div>MYROSLAV BLOG</div>
          </Link>
          <div className={styles.buttons}>
            {isAuth ? (
              <>
                <Button variant="contained" onClick={() => navigate('write')}>
                  Write Post
                </Button>
                <Button variant="contained" onClick={handleLogout}>
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Link to="/login">
                  <Button variant="outlined">Войти</Button>
                </Link>
                <Link to="/register">
                  <Button variant="contained">Создать аккаунт</Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </Container>
    </div>
  );
};
