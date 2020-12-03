import React from 'react';
import { ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import { Domain, ExitToApp, People, Train, TransferWithinAStation } from '@material-ui/icons';
import { useHistory } from 'react-router';
import Sidebar from '../../../components/sidebar/sidebar';
import { useToken } from '../../../util/store/token';

export default function AdminSidebar(props: { children?: React.ReactNode; className: string }): JSX.Element {
  const router = useHistory();
  const [, setToken] = useToken();
  return (
    <Sidebar
      className={props.className}
      list={
        <React.Fragment>
          <ListItem
            button
            onClick={() => {
              router.push({ pathname: '/admin/station' });
            }}
            selected={router.location.pathname === '/admin/station'}
          >
            <ListItemIcon>
              <Domain />
            </ListItemIcon>
            <ListItemText>车站管理</ListItemText>
          </ListItem>
          <ListItem
            button
            onClick={() => {
              router.push({ pathname: '/admin/train' });
            }}
            selected={router.location.pathname === '/admin/train'}
          >
            <ListItemIcon>
              <Train />
            </ListItemIcon>
            <ListItemText>列车管理</ListItemText>
          </ListItem>
          <ListItem
            button
            onClick={() => {
              router.push({ pathname: '/admin/trip' });
            }}
            selected={router.location.pathname === '/admin/trip'}
          >
            <ListItemIcon>
              <TransferWithinAStation />
            </ListItemIcon>
            <ListItemText>旅行管理</ListItemText>
          </ListItem>
          <ListItem
            button
            onClick={() => {
              router.push({ pathname: '/admin/passengers' });
            }}
            selected={router.location.pathname === '/admin/passengers'}
          >
            <ListItemIcon>
              <People />
            </ListItemIcon>
            <ListItemText>乘客管理</ListItemText>
          </ListItem>
        </React.Fragment>
      }
      otherList={
        <React.Fragment>
          <ListItem
            button
            onClick={() => {
              setToken('');
            }}
          >
            <ListItemIcon>
              <ExitToApp />
            </ListItemIcon>
            <ListItemText>退出登陆</ListItemText>
          </ListItem>
        </React.Fragment>
      }
    >
      {props.children}
    </Sidebar>
  );
}
