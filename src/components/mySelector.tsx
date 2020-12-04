import { FormControl, InputLabel, MenuItem, Select } from '@material-ui/core';
import React from 'react';

export default function MySelector(props: {
  value: number;
  onValueChange(newValue: number): void;
  label: string;
  itemList: { value: number; text: React.ReactNode }[];
}): JSX.Element {
  return (
    <FormControl>
      <InputLabel id="demo-simple-select-label">{props.label}</InputLabel>
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={props.value}
        onChange={(e) => {
          props.onValueChange(e.target.value as number);
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
