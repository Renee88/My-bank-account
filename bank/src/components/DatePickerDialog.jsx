import React, { useState, useEffect } from 'react';
import DateFnsUtils from '@date-io/date-fns'; // choose your lib
import {
  DatePicker,
  TimePicker,
  DateTimePicker,
  MuiPickersUtilsProvider,
} from '@material-ui/pickers';

function DatePickerDialog(props) {
  const [selectedDate, handleDateChange] = useState(new Date());
    
    useEffect(() => {
        props.updateDate(selectedDate)
    })


  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <DatePicker value={selectedDate} onChange={handleDateChange} />
    </MuiPickersUtilsProvider>
  )
}

export default DatePickerDialog