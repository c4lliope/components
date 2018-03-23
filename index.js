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
