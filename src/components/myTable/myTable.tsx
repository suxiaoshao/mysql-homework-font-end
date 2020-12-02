import { CircularProgress, Paper, TableContainer } from '@material-ui/core';
import React from 'react';
import './myTable.scss';

export default function MyTable(props: {
  loading: boolean;
  errorString: string | undefined;
  children?: React.ReactNode;
}): JSX.Element {
  return (
    <TableContainer component={Paper} className="my-table">
      {props.loading || props.errorString !== undefined ? (
        props.loading ? (
          <div className="my-table-loading">
            <CircularProgress />
          </div>
        ) : (
          <div>{props.errorString}</div>
        )
      ) : (
        props.children
      )}
    </TableContainer>
  );
}
