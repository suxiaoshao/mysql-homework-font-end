import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@material-ui/core';
import React from 'react';
import { useToken } from '../../../../util/store/token';
import './loginDialog.scss';
import { httpToast } from '../../../../util/httpToast';
import { postLogin } from '../../../../util/http/postLogin';
import { useHistory } from 'react-router';

export default function LoginDialog(): JSX.Element {
  const [token, setToken] = useToken();
  const loginOpen = React.useMemo<boolean>(() => {
    return token === '';
  }, [token]);
  const [userName, setUserName] = React.useState<string>('');
  const [password, setPassword] = React.useState<string>('');
  const myHistory = useHistory();
  return (
    <Dialog open={loginOpen} fullWidth maxWidth={'xs'}>
      <DialogTitle>管理员登陆</DialogTitle>
      <DialogContent className="login-dialog">
        <TextField
          label="用户名"
          className="form-item"
          value={userName}
          onChange={(e) => {
            setUserName(e.target.value);
          }}
        />
        <TextField
          label="密码"
          className="form-item"
          value={password}
          type="password"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
      </DialogContent>
      <DialogActions>
        <Button
          onClick={() => {
            myHistory.push('/');
          }}
        >
          返回首页
        </Button>
        <Button
          onClick={() => {
            httpToast(async () => {
              return await postLogin(userName, password);
            }, '登陆成功').then((data) => {
              setToken(data.token);
            });
          }}
        >
          登陆
        </Button>
      </DialogActions>
    </Dialog>
  );
}
