import React from 'react';
import { Divider, Drawer, List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import { Home } from '@material-ui/icons';
import { useHistory } from 'react-router';
import './sidebar.scss';

export default function Sidebar(props: {
  children?: React.ReactNode;
  className: string;
  list?: React.ReactNode;
  otherList?: React.ReactNode;
}): JSX.Element {
  const router = useHistory();
  return (
    <div className="sidebar-page">
      <Drawer open variant="permanent" anchor="left" className="sidebar">
        <List className="sidebar-list">
          {props.list}
          <Divider />
          {props.otherList}
          <ListItem
            button
            onClick={() => {
              router.push({ pathname: '/' });
            }}
          >
            <ListItemIcon>
              <Home />
            </ListItemIcon>
            <ListItemText>返回首页</ListItemText>
          </ListItem>
        </List>
      </Drawer>
      <div className={`sidebar-other ${props.className}`}>{props.children}</div>
    </div>
  );
}
