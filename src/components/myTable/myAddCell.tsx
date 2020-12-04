import { Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, TableCell } from '@material-ui/core';
import { Add } from '@material-ui/icons';

import React from 'react';

export default function MyAddCell(props: {
  children: React.ReactNode;
  title: string;
  onAdd(): Promise<void>;
  disableClick?: boolean;
}): JSX.Element {
  const [addOpen, setAddOpen] = React.useState<boolean>(false);
  return (
    <TableCell>
      <IconButton aria-label="expand row" size="small" onClick={() => setAddOpen(!addOpen)}>
        <Add />
      </IconButton>
      <Dialog open={addOpen} onClose={() => setAddOpen(!addOpen)}>
        <DialogTitle>{props.title}</DialogTitle>
        <DialogContent className="login-dialog">{props.children}</DialogContent>
        <DialogActions>
          <Button
            color={'secondary'}
            onClick={() => {
              setAddOpen(false);
            }}
          >
            取消
          </Button>
          <Button
            disabled={props.disableClick}
            color={'primary'}
            onClick={() => {
              props.onAdd().then(() => {
                setAddOpen(false);
              });
            }}
          >
            添加
          </Button>
        </DialogActions>
      </Dialog>
    </TableCell>
  );
}
