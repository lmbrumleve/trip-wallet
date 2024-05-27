import React, { useState } from 'react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaCalendarAlt } from 'react-icons/fa';
import Calendar from 'react-calendar';
function CustomInput({value, onClick}){


    return(
        <div className='input-group trip-button'>
            <input type="text" className='form-control' value={value} onClick={onClick} readOnly/>
            <div className='input-group-append'>
                <span className='input-group-text'>
                    <FaCalendarAlt/>
                </span>
            </div>
        </div>
    )
}

function CalendarInput() {
    // const [selectedDate, setSelectedDate] = useState(null);
    const [date, setDate] = useState(new Date());
    const [startDate, setStartDate] = useState();
    const [endDate, setEndDate] = useState();

    const handleChange = (range) => {
        const [startDate, endDate] = range;
        setStartDate(startDate);
        setEndDate(endDate);
      };

    return (
    
        <div>
      <DatePicker
        selected={startDate}
        customInput={<CustomInput/>} 
        onChange={handleChange}
        startDate={startDate}
        endDate={endDate}
        selectsRange
      />
      </div>
    );
}

export default CalendarInput;
