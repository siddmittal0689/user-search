import React from "react";
export function DatePicker(props) {
  return (
    <div id="date-picker" className="col-xs-6 text-left">
       Start Date <input type="date" name="startDate" min='1970-01-01' value={props.startDate} onChange={props.setStartDate}/>
       End Date <input type="date" name="endDate" min={props.startDate} value={props.endDate} onChange={props.setEndDate}/>
    </div>
  );
}

