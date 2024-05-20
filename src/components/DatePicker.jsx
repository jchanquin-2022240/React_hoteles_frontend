import DatePickerComponent from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import  { useState } from "react";


export const DatePicker = () => {
    
    const [fecha, setFecha] = useState(new Date());

    const onChange = fecha => {
        setFecha(fecha);
    }

    return(
        <>
            <div className=""> 
                <div>
                    <DatePickerComponent selected={fecha} onChange={onChange}/>
                </div>
            </div>
        </>
    );
}