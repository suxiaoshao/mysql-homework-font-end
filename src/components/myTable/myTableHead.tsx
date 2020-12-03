import { TableCell, TableHead, TableRow } from '@material-ui/core';
import React from 'react';

export default function MyTableHead(props: { tableHeadList: string[]; more: boolean }): JSX.Element {
  return (
    <TableHead>
      <TableRow>
        {props.more ? <TableCell /> : undefined}
        {props.tableHeadList.map((value, index) => (
          <TableCell key={value} align={index !== 0 ? 'right' : 'left'}>
            {value}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}
