import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

// Peer dependencies
import moment from "moment"

import TimePicker from "./Timepicker"
import TimeSpanInput from "./TimeSpanInput"

storiesOf("[touch] Scrolling time input", module)
  .add("blank", () => (
    <TimePicker onChange={action("changed")}/>
  ))
  .add("with pre-set time", () => (
    <TimePicker initialValue={moment()} onChange={action("changed")}/>
  ))
  .add("with limited hour options", () => (
    <TimePicker
      hourOptions={[9,10,11,12,13,14,15,16,17]}
      onChange={action("changed")}
    />
  ))
  .add("with limited minute options", () => (
    <TimePicker
      minuteOptions={[0,15,30,45]}
      onChange={action("changed")}
    />
  ))

storiesOf("Time span input", module)
  .add("blank", () => (
    <TimeSpanInput
      onStartTimeChange={action("start time changed")}
      onEndTimeChange={action("end time changed")}
    />
  ))
  .add("with pre-set time", () => (
    <TimeSpanInput
      startTime={moment()}
      endTime={moment().add(1, "hour")}
      onStartTimeChange={action("start time changed")}
      onEndTimeChange={action("end time changed")}
    />
  ))
  .add("with an invalid time range", () => (
    <TimeSpanInput
      endTime={moment().subtract(1, "hour")}
      startTime={moment()}
      onStartTimeChange={action("start time changed")}
      onEndTimeChange={action("end time changed")}
    />
  ))
  .add("with limited time options", () => (
    <TimeSpanInput
      hourOptions={[9,10,11,12,13,14,15,16,17]}
      minuteOptions={[0,15,30,45]}
      onStartTimeChange={action("start time changed")}
      onEndTimeChange={action("end time changed")}
    />
  ))
