import React from 'react';

import { reservationFormContext } from '../../../contexts/reservationFormContext';

function StepFive(props) {
    const { addressPick} = React.useContext(reservationFormContext);
    const { addressDrop } = React.useContext(reservationFormContext);
    let mapUrl = `https://www.google.com/maps/embed/v1/directions?origin=${addressPick}&destination=${addressDrop}&language=EN&key=AIzaSyA97rzK2Y0x79nYrp4ozU5NzB7acY8MASE`;
    return (
        <div className="reservation-form__step-five">
            <div className="reservation-form__inner-container">
                <div className="step-five__step-five-header">
                    <span className="step-five__header-text">Reservation form</span>
                    <div>
                        <span>← Back</span>
                        <span>Step 2 of 5</span>
                    </div>
                </div>
                <div className="step-five__step-five-form">
                    <div className="step-five__pickup-container">
                        <p>First & Last Name</p>
                        <input className="reservation-form__input rounded"/>
                    </div>
                    <div className="step-five__dropoff-container">
                        <p>Phone Number</p>
                        <input className="reservation-form__input rounded"/>
                    </div>
                    <div className="step-five__dropoff-container">
                        <p>Email Adress</p>
                        <input className="reservation-form__input rounded"/>
                    </div>
                </div>
                <div className="step-five__step-five-footer">
                    <div>
                        <span>Total</span>
                        <span>$0</span>
                    </div>
                    <div className="reservation-form__submit-btn rounded pointer" onClick={props.next}>
                        <span className="reservation-form__submit-text">Next Step →</span>
                    </div>
                </div>
            </div>
            <iframe title="google-map" frameBorder="0" style={{ width: "100%", height: "100%", borderRadius: "6px" }} src={mapUrl}></iframe>
        </div>
    )
}

export default StepFive;