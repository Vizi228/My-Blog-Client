import React from 'react';
import styles from './UserInfo.module.scss';
import Avatar from '@mui/material/Avatar';

export const UserInfo = ({ avatarUrl, fullName, additionalText }) => {
  console.log(avatarUrl);
  return (
    <div className={styles.root}>
      {avatarUrl ? (
        <img className={styles.avatar} src={avatarUrl} alt={fullName} />
      ) : (
        <Avatar>{fullName && fullName[0]}</Avatar>
      )}

      <div className={styles.userDetails}>
        <span className={styles.userName}>{fullName}</span>
        <span className={styles.additional}>{additionalText}</span>
      </div>
    </div>
  );
};
