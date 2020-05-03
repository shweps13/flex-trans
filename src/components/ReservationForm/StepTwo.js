import React, { useEffect } from 'react';
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from "react-places-autocomplete";

import { reservationFormContext } from '../../contexts/reservationFormContext';

import fordtransit from '../../images/car-left-shadow.png';

function StepOne(props) {
    const { addressPick, setAddressPick } = React.useContext(reservationFormContext);
    const { setCoordinatesPick } = React.useContext(reservationFormContext);
    const { buildingInfoPick, setBuildingInfoPick } = React.useContext(reservationFormContext);
    const { addressDrop, setAddressDrop } = React.useContext(reservationFormContext);
    const { setCoordinatesDrop } = React.useContext(reservationFormContext);
    const { buildingInfoDrop, setBuildingInfoDrop } = React.useContext(reservationFormContext);
    const { browserLocation, serBrowserLocation } = React.useContext(reservationFormContext);

    const handleSelectPick = async value => {
        const results = await geocodeByAddress(value);
        const latLng = await getLatLng(results[0]);
        setAddressPick(value);
        setCoordinatesPick(latLng);
    };

    const handleBuildingInfoPick = (e) => {
        setBuildingInfoPick(e.target.value);
    }

    const handleSelectDrop = async value => {
        const results = await geocodeByAddress(value);
        const latLng = await getLatLng(results[0]);
        setAddressDrop(value);
        setCoordinatesDrop(latLng);
    };

    const handleBuildingInfoDrop = (e) => {
        setBuildingInfoDrop(e.target.value);
    }

    const nextStep = () => {
        if (!addressPick || !addressDrop) {
            alert("Fill out all fields!");
        } else {
            props.next();
        }
    }

    let mapUrl = `https://maps.google.com/maps?q=seattle&t=&z=9&ie=UTF8&iwloc=&output=embed`;
    // let mapUrl = `https://maps.google.com/maps?q=${browserLocation.browserLat}+${browserLocation.browserLong}&t=&z=9&ie=UTF8&iwloc=&output=embed`;
    // let mapUrl = `https://www.google.com/maps/embed/v1/directions?origin=${addressPick}&destination=${addressDrop}&key=AIzaSyA97rzK2Y0x79nYrp4ozU5NzB7acY8MASE`;

    return (
        <div className="new-form-step-two__container">
            <div className="new-form-step-two__new-form-step-form-container">
                <div className="">
                    <span className="new-form-step-two__header">Reservation Form</span>
                    <div className="">
                        <p className=" reservation-form__input-label">Pick-up location</p>
                        <PlacesAutocomplete value={addressPick} onChange={setAddressPick} onSelect={handleSelectPick}>
                            {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
                                <div style={{ gridArea: "address", position: "relative", display: "flex", flexDirection: "column" }}>
                                    <input
                                        className="reservation-form__input rounded"
                                        {...getInputProps({ placeholder: "Pick-up location" })} />

                                    <div style={{
                                        position: "absolute",
                                        zIndex: "2",
                                        top: "5.2rem",
                                        width: "100%",
                                        fontSize: "1.6rem",
                                        cursor: "pointer"
                                    }}>
                                        {loading ? <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}><span style={{ padding: "1.6rem 2rem" }}>...loading</span></div> : null}

                                        {suggestions.map(suggestion => {
                                            const style = {
                                                width: "100%",
                                                backgroundColor: suggestion.active ? "#41b6e6" : "#fff",
                                                color: suggestion.active ? "#fff" : "#000",
                                                padding: "1.6rem 2rem"
                                            };

                                            return (
                                                <div {...getSuggestionItemProps(suggestion, { style })}>
                                                    {suggestion.description}
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                            )}
                        </PlacesAutocomplete>
                        <input className="step-four__apt-input reservation-form__input rounded" placeholder="Apt./Ste" onChange={e => handleBuildingInfoPick(e)} />
                    </div>
                    <div className="step-four__address-container">
                        <p className="step-four__address-input-header reservation-form__input-label">Drop-off location</p>
                        <PlacesAutocomplete value={addressDrop} onChange={setAddressDrop} onSelect={handleSelectDrop}>
                            {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
                                <div style={{ gridArea: "address", position: "relative", display: "flex", flexDirection: "column" }}>

                                    <input
                                        className="reservation-form__input rounded"
                                        {...getInputProps({ placeholder: "Drop-off location" })} />

                                    <div style={{
                                        position: "absolute",
                                        top: "5.2rem",
                                        width: "100%",
                                        fontSize: "1.6rem",
                                        cursor: "pointer"
                                    }}>
                                        {loading ? <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}><span style={{ padding: "1.6rem 2rem" }}>...loading</span></div> : null}

                                        {suggestions.map(suggestion => {
                                            const style = {
                                                width: "100%",
                                                backgroundColor: suggestion.active ? "#41b6e6" : "#fff",
                                                color: suggestion.active ? "#fff" : "#000",
                                                padding: "1.6rem 2rem"
                                            };

                                            return (
                                                <div {...getSuggestionItemProps(suggestion, { style })}>
                                                    {suggestion.description}
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                            )}
                        </PlacesAutocomplete>
                        <input className="step-four__apt-input reservation-form__input rounded" placeholder="Apt./Ste" onChange={e => handleBuildingInfoDrop(e)} />
                    </div>
                </div>

                <div className="reservation-form__submit-btn rounded pointer" onClick={() => nextStep()}>
                    <span className="reservation-form__submit-text">Reserve a trip</span>
                </div>
            </div>
            <div>
                <iframe title="google-map" frameBorder="0" style={{ width: "100%", height: "100%", borderTopRightRadius: "6px", borderBottomRightRadius: "6px" }} src={mapUrl}></iframe>
                {/* <span>Distance {distance}</span> */}
            </div>
        </div>
    )
}

export default StepOne;