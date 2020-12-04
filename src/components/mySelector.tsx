import { FormControl, InputLabel, MenuItem, Select } from '@material-ui/core';
import React from 'react';

export default function MySelector<T extends number | string>(props: {
  value: T;
  onValueChange(newValue: T): void;
  label: string;
  itemList: { value: T; text: React.ReactNode }[];
}): JSX.Element {
  return (
    <FormControl>
      <InputLabel id="demo-simple-select-label">{props.label}</InputLabel>
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={props.value}
        onChange={(e) => {
          props.onValueChange(e.target.value as T);
        }}
      >
        {props.itemList.map((value) => (
          <MenuItem key={value.value} value={value.value}>
            {value.text}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
