import React from 'react';
import { ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import { Directions, Phone, Train } from '@material-ui/icons';
import { useHistory } from 'react-router';
import Sidebar from '../../../components/sidebar/sidebar';

export default function UserSidebar(props: { children?: React.ReactNode; className: string }): JSX.Element {
  const router = useHistory();
  return (
    <Sidebar
      className={props.className}
      list={
        <React.Fragment>
          <ListItem
            button
            onClick={() => {
              router.push({ pathname: '/user/queryTrains' });
            }}
            selected={router.location.pathname === '/user/queryTrains'}
          >
            <ListItemIcon>
              <Train />
            </ListItemIcon>
            <ListItemText>查询车次</ListItemText>
          </ListItem>
          <ListItem
            button
            onClick={() => {
              router.push({ pathname: '/user/queryTrip' });
            }}
            selected={router.location.pathname === '/user/queryTrip'}
          >
            <ListItemIcon>
              <Directions />
            </ListItemIcon>
            <ListItemText>查询行程</ListItemText>
          </ListItem>
          <ListItem
            button
            onClick={() => {
              router.push({ pathname: '/user/contact' });
            }}
            selected={router.location.pathname === '/user/contact'}
          >
            <ListItemIcon>
              <Phone />
            </ListItemIcon>
            <ListItemText>客服电话</ListItemText>
          </ListItem>
        </React.Fragment>
      }
    >
      {props.children}
    </Sidebar>
  );
}
