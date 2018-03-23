import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

// Peer dependencies
import moment from "moment"

import TimePicker from "./Timepicker"

storiesOf("[touch] Scrolling time input", module)
  .add("blank", () => (
    <TimePicker onChange={action("changed")}/>
  ))
  .add("with pre-set time", () => (
    <TimePicker time={moment()} onChange={action("changed")}/>
  ))
  .add("with limited hour options", () => (
    <TimePicker
      hourOptions={[9,10,11,12,13,14,15,16,17]}
      onChange={action("changed")}
    />
  ))
  .add("with limited minute options", () => (
    <TimePicker
      minuteOptions={[0,10,20,30,40,50]}
      onChange={action("changed")}
    />
  ))
