import React from 'react';
import AdminSidebar from '../components/sidebar';
import { useALlStation } from '../../../util/store/allStation';
import MyTable from '../../../components/myTable/myTable';
import { Collapse, IconButton, TableBody, TableCell, TableRow } from '@material-ui/core';
import { Station } from '../../../util/http/getAllStation';
import { KeyboardArrowDown, KeyboardArrowUp } from '@material-ui/icons';
import MyTableHead from '../../../components/myTable/myTableHead';
import MyTableRow from '../../../components/myTable/myTableRow';

function TableRowMore(props: Station): JSX.Element {
  const [open, setOpen] = React.useState<boolean>(false);
  return (
    <React.Fragment>
      <TableRow key={props.stationId}>
        <TableCell>
          <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
            {open ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
          </IconButton>
        </TableCell>
        <TableCell>{props.stationId}</TableCell>
        <TableCell align="right">{props.stationName}</TableCell>
        <TableCell align="right">{props.phoneNumber}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={4}>
          <Collapse in={open}>234325436547</Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

const tableHeadList = ['车站id', '车站名', '车站联系方式'];
export default function Station(): JSX.Element {
  const [allStation] = useALlStation();
  return (
    <AdminSidebar className={'query-trains'}>
      <MyTable loading={false} errorString={undefined}>
        <MyTableHead tableHeadList={tableHeadList} more />
        <TableBody>
          {allStation?.map((value) => (
            <MyTableRow openContent={123432134} key={value.stationId}>
              <TableCell>{value.stationId}</TableCell>
              <TableCell align="right">{value.stationName}</TableCell>
              <TableCell align="right">{value.phoneNumber}</TableCell>
            </MyTableRow>
          ))}
        </TableBody>
      </MyTable>
    </AdminSidebar>
  );
}
