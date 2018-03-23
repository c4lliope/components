/* Dependencies:
 * yarn add moment styled-components react
 */

import React from "react"
import styled from "styled-components"
import moment from "moment"

const blue = "#4a90e2"

/*
 * Props:
 * `time`: a `moment` object
 * `onChange`: a callback function that takes a `moment` object.
 * `hourOptions`: a list of allowed values for the hour
 * `minuteOptions`: a list of allowed values for the minute
 */
class Timepicker extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      open: false,
      hourPartial: null,
      minutePartial: null,
    }
  }

  hourOptions() {
    return this.props.hourOptions ||
      Array.apply(null, {length: 24}).map(Number.call, Number)
  }

  minuteOptions() {
    return this.props.minuteOptions ||
      Array.apply(null, {length: 60}).map(Number.call, Number)
  }

  render() {
    let selectedHour = this.state.hourPartial || (this.props.time && this.props.time.hour())
    let selectedMinute = this.state.minutePartial || (this.props.time && this.props.time.minute())

    return (
      <Wrapper>
        <TimeInput
          value={this.props.time ? this.props.time.format("HH:mm") : ""}
          onChange={(event) => this.props.onChange(moment(event.target.value, "HH:mm"))}
          onFocus={() => this.focused()}
          onKeyPress={(e) => e.key === "Enter" && this.enter(e)}
        />

        { this.state.open &&
          <TouchInput>
            <Scroll>
              {this.hourOptions().map((hour) => (
                <TimeOption
                  innerRef={(node) => node && (hour == selectedHour) && node.scrollIntoView()}
                  key={hour}
                  onClick={() => this.hourSelected(hour)}
                  selected={hour == selectedHour}
                >{pad(hour, 2)}</TimeOption>
              ))}
            </Scroll>

            <Scroll>
              {this.minuteOptions().map((minute) => (
                <TimeOption
                  innerRef={(node) => node && (minute == selectedMinute) && node.scrollIntoView()}
                  key={minute}
                  onClick={() => this.minuteSelected(minute)}
                  selected={minute == selectedMinute}
                >{pad(minute, 2)}</TimeOption>
              ))}
            </Scroll>

            <Close onClick={() => this.setState({open: false})}>X</Close>
          </TouchInput>
        }
      </Wrapper>
    )
  }

  focused() {
    this.setState({ open: true })

    if(this.props.time == null)
      this.props.onChange(moment())
  }

  enter(event) {
    event.target.blur()
    this.setState({ open: false})
  }

  hourSelected(hour) {
    let minute = this.state.minutePartial

    if(hour && minute) {
      this.props.onChange(moment(`${hour}:${minute}`, "HH:mm"))
      this.setState({ hourPartial: null, minutePartial: null })
    } else
      this.setState({ hourPartial: hour })
  }

  minuteSelected(minute) {
    let hour = this.state.hourPartial

    if(hour && minute) {
      this.props.onChange(moment(`${hour}:${minute}`, "HH:mm"))
      this.setState({ hourPartial: null, minutePartial: null })
    } else
      this.setState({ minutePartial: minute })

    this.setState({open: false})
  }
}

function pad(num, size) {
  var s = num+"";
  while (s.length < size) s = "0" + s;
  return s;
}

const TimeInput = styled.input`
  padding: 0.5rem;
`

const Wrapper = styled.div`
  display: inline-block;
`

const TouchInput = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  background-color: white;
  height: 15rem;
  position: fixed;
  width: 10rem;
`

const Scroll = styled.div`
  border: 1px solid grey;
  overflow-y: scroll;
`

const TimeOption = styled.div`
  padding: 0.5rem;
  ${({selected}) => selected && `background-color: ${blue}; color: white;`}
`

const Close = styled.div`
  background-color: ${blue};
  color: white;
  grid-column: 1 / -1;
  padding: 0.5rem;
  text-align: center;
`

export default Timepicker
