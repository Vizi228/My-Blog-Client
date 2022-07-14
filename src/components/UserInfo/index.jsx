import React from 'react';
import styles from './UserInfo.module.scss';
import Avatar from '@mui/material/Avatar';
import { getDate } from '../../utils/helpers/getDate';
import { memo } from 'react';

export const UserInfo = memo(({ avatarUrl, fullName, additionalText }) => {
  const date = getDate(additionalText);
  return (
    <div className={styles.root}>
      {avatarUrl ? (
        <img className={styles.avatar} src={`${avatarUrl}`} alt={fullName} />
      ) : (
        <Avatar>{fullName && fullName[0]}</Avatar>
      )}

      <div className={styles.userDetails}>
        <span className={styles.userName}>{fullName}</span>
        <span className={styles.additional}>{date}</span>
      </div>
    </div>
  );
});
