import React from 'react';
import { reservationFormContext } from '../../contexts/reservationFormContext';
import fordtransit from '../../images/car-left-shadow.png';
import DateInput from 'react-date-picker';

function StepOne(props) {
    const { date, setDate, time, setTime } = React.useContext(reservationFormContext);

    /** @param {Date} date @type void */
    const handleDateChange = (date) => {
        console.log('date ', date)
        setDate(date);
        // console.log('date => ', date);
    }
    
    const getTomorrow = () => {
        var tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        return new Date(tomorrow);
    }

    const handleHoursChange = (e) => {
        setTime({ ...time, hours: e.target.value });
        // console.log('time => ', time);
    }

    const handleMinutesChange = (e) => {
        setTime({ ...time, minutes: e.target.value });
        // console.log('time => ', time);
    }

    const handleRadioChange = (e) => {
        setTime ({ ...time, ampm: e.target.value });
        // console.log('time => ', time);
    }

    const nextStep = () => {
        // let today = new Date();
        console.log('date ', date);
        let timeStr = time.hours + ':' + time.minutes + ' ' + time.ampm;
        setTime ({ ...time, fullTime: timeStr });

        if (!date || !time.ampm) {
            alert ("Fill out all fields!");
        } else {
            props.next();
        }
    }

    return (
        <div className="reservation-form__step-one">
                <div className="step-one__form rounded-desktop">
                <span className="step-three__header step-three__header-pb-2">Pick-up date and time</span>
                <div className="step-three__reservation-date-picker-container step-three__reservation-date-picker-container--reservation">
                    {/* <input className="reservation-form__input reservation-form__input--no-margin rounded" type="date" onChange={e => handleDateChange(e)}/> */}
                    <DateInput minDate={getTomorrow()} onChange={e => handleDateChange(e)} value={date}/>
                    <div className="reservation-date-picker-container__reservation-time-picker">
                        <select className="reservation-form__input reservation-form__input--no-margin rounded" onChange={e => handleHoursChange(e)}>
                            <option>0</option>
                            <option>1</option>
                            <option>2</option>
                            <option>3</option>
                            <option>4</option>
                            <option>5</option>
                            <option>6</option>
                            <option>7</option>
                            <option>8</option>
                            <option>9</option>
                            <option>10</option>
                            <option>11</option>
                            <option>12</option>
                        </select>
                        <span> : </span>
                        <select className="reservation-form__input reservation-form__input--no-margin rounded" onChange={e => handleMinutesChange(e)}>
                            <option>00</option>
                            <option>15</option>
                            <option>30</option>
                            <option>45</option>
                        </select>
                    </div>
                    <div className="reservation-date-picker-container__reservation-am-pm-picker">
                        <div className="reservation-am-pm-picker__inner-container">
                            <div className="reservation-date-picker-container__am-container">
                                <input type="radio" id="time-am" name="gender" value="am" onChange={e => handleRadioChange(e)}/>
                                <label for="time-am">am</label>
                            </div>
                            <div className="reservation-date-picker-container__pm-container">
                                <input type="radio" id="time-pm" name="gender" value="pm" onChange={e => handleRadioChange(e)}/>
                                <label for="time-pm">pm</label>
                            </div>
                        </div>
                        <div></div>
                        <div></div>
                    </div>
                </div>  
                
                    <div className="reservation-form__submit-btn rounded pointer" onClick={() => nextStep()}>
                        <span className="reservation-form__submit-text">Reserve a trip</span>
                        <div className="reservation-form__triangle"></div>
                    </div>
                </div>
                <div className="step-one__car-photo-container">
                    <img className="img-fluid" src={fordtransit} alt="Ford Transit Wheelchair Vagon"/>
                </div>
        </div>
    )
}

export default StepOne;