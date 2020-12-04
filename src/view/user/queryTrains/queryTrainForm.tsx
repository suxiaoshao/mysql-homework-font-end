import React from 'react';
import { Button, ButtonGroup, Menu, MenuItem } from '@material-ui/core';
import { useALlStation } from '../../../util/store/allStation';

export default function QueryTrainForm(props: {
  allMode: boolean;
  onAllModeChange(newMode: boolean): void;
  activeStationId: number;
  onActiveStationChange(newActive: number): void;
  gdcPrefix: boolean;
  onGdcPrefixChange(newGdcPrefix: boolean): void;
  onSearch(): void;
}): JSX.Element {
  const [modeEl, setModeEl] = React.useState<HTMLButtonElement | null>(null);
  const [allStation] = useALlStation();
  const [activeEl, setActiveEl] = React.useState<HTMLButtonElement | null>(null);
  return (
    <React.Fragment>
      <ButtonGroup className="query-train-form" variant="contained" color="primary">
        <Button
          onClick={(e) => {
            setModeEl(e.currentTarget);
          }}
        >
          {props.allMode ? '全部终点站' : '根据终点站查询'}
        </Button>
        <Button
          disabled={props.allMode}
          onClick={(event) => {
            setActiveEl(event.currentTarget);
          }}
        >
          {props.allMode
            ? '未确定'
            : allStation.find((value) => value.stationId === props.activeStationId)?.stationName ?? '未确定'}
        </Button>
        <Button
          onClick={() => {
            props.onGdcPrefixChange(!props.gdcPrefix);
          }}
        >
          {props.gdcPrefix ? '动车/高铁' : '全部列车类型'}
        </Button>
        <Button
          onClick={() => {
            props.onSearch();
          }}
        >
          查询
        </Button>
      </ButtonGroup>
      <Menu
        open={Boolean(modeEl)}
        anchorEl={modeEl}
        onClose={() => {
          setModeEl(null);
        }}
      >
        <MenuItem
          selected={props.allMode}
          onClick={() => {
            props.onAllModeChange(true);
            setModeEl(null);
          }}
        >
          全部终点站
        </MenuItem>
        <MenuItem
          selected={!props.allMode}
          onClick={() => {
            props.onAllModeChange(false);
            setModeEl(null);
          }}
        >
          根据终点站查询
        </MenuItem>
      </Menu>
      <Menu
        open={Boolean(activeEl)}
        anchorEl={activeEl}
        onClose={() => {
          setActiveEl(null);
        }}
      >
        {allStation.map((value) => (
          <MenuItem
            selected={value.stationId === props.activeStationId}
            key={value.stationId}
            onClick={() => {
              props.onActiveStationChange(value.stationId);
              setActiveEl(null);
            }}
          >
            {value.stationName}
          </MenuItem>
        ))}
      </Menu>
    </React.Fragment>
  );
}
