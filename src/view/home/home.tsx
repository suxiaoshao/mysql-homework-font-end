import React from 'react';
import './home.scss';
import { Button, Typography } from '@material-ui/core';
import { AccountCircle, SupervisedUserCircle } from '@material-ui/icons';
import { useHistory } from 'react-router';

export default function Home(): JSX.Element {
  const router = useHistory();
  return (
    <div className="home-father">
      <div className="home">
        <Typography variant="h3" component="h2" gutterBottom>
          选择你的身份
        </Typography>
        <div className="home-button">
          <Button
            startIcon={<AccountCircle />}
            variant="contained"
            size="large"
            color="primary"
            onClick={() => {
              router.push({ pathname: '/user/queryTrains' });
            }}
          >
            用户
          </Button>
          <Button
            startIcon={<SupervisedUserCircle />}
            variant="contained"
            size="large"
            color="primary"
            onClick={() => {
              router.push({ pathname: '/admin/station' });
            }}
          >
            管理员
          </Button>
        </div>
      </div>
    </div>
  );
}
