import { Box, Collapse, IconButton, TableCell, TableRow } from '@material-ui/core';
import { KeyboardArrowDown, KeyboardArrowUp } from '@material-ui/icons';
import React from 'react';

export default function MyTableRow(props: { children: React.ReactNode; openContent: React.ReactNode }): JSX.Element {
  const [open, setOpen] = React.useState<boolean>(false);
  return (
    <React.Fragment>
      <TableRow>
        <TableCell>
          <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
            {open ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
          </IconButton>
        </TableCell>
        {props.children}
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={4}>
          <Collapse in={open}>
            <Box margin={1}>{props.openContent}</Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}
