import { setQuarter } from 'date-fns';
import { useState } from 'react'
import React from 'react';
import PlacesAutocomplete, {
    geocodeByAddress,
    getLatLng,
} from 'react-places-autocomplete';






function LocationSearchInput(props) {

    const [address, setAddress] = useState('');
    const [coordinates, setCoordinates] = useState({
        lat: null,
        lon: null
    })

    const handleSelect = async value => {
        const results = await geocodeByAddress(value);
        const ll = await getLatLng(results[0]);
        console.log(ll)
        setAddress(value)
        setCoordinates(ll)
        props.setCoordinates(ll);
        props.setLocationName(value.split(" ")[0])
    };


    return (
        <div className='apppp'>

            <PlacesAutocomplete
                value={address}
                onChange={setAddress}
                onSelect={handleSelect}
            >
                {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
                    <div className={props.page ? '' : `search_2`}>
                        {props.placeholder ?


                            <input
                                style={{ width: "auto" }}
                                {...getInputProps({
                                    placeholder: 'Location',
                                    className: 'location-search-input',
                                })}
                            />
                            :
                            <input
                                style={{ width: "25rem" }}
                                {...getInputProps({
                                    placeholder: 'City/Hostel/Area/Building',
                                    className: 'location-search-input',
                                })}
                            />
                        }
                        {/* <div className="autocomplete-dropdown-container  place-search catSearchWrapper">
                            {loading && <div>Loading...</div>}
                            <div className="overflow_handler">
                                <ul className="search_p_list pl-0">
                                    {suggestions.map(suggestion => {
                                        const className = suggestion.active
                                            ? 'suggestion-item--active'
                                            : 'suggestion-item';
                                        // inline style for demonstration purpose
                                        const style = suggestion.active
                                            ? { backgroundColor: '#fafafa', cursor: 'pointer' }
                                            : { backgroundColor: '#ffffff', cursor: 'pointer' };
                                        return (

                                            <li className="d-flex align-items-start py-2 px-4 cursor-point search-product" style={{gap: "2rem"}}>
                                                <div className="pd_txt"
                                                    {...getSuggestionItemProps(suggestion, {
                                                        className,
                                                        style,
                                                    })}
                                                >
                                                    <p className="m-0 fs-6"><span>{suggestion.description}</span></p>
                                                </div>
                                            </li>
                                        );
                                    })}
                                </ul>
                            </div>
                        </div> */}

                        <div className="autocomplete-dropdown-container  place-search" style={{ border: "none" }}>
                            {loading && <div>Loading...</div>}
                            {suggestions.map(suggestion => {
                                const className = suggestion.active
                                    ? 'suggestion-item--active'
                                    : 'suggestion-item';
                                const style = suggestion.active
                                    ? { backgroundColor: '#fafafa', cursor: 'pointer' }
                                    : { backgroundColor: '#ffffff', cursor: 'pointer' };
                                return (
                                    <div
                                        {...getSuggestionItemProps(suggestion, {
                                            className,
                                            style,
                                        })}
                                    >
                                        <span>{suggestion.description}</span>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                )}
            </PlacesAutocomplete>
        </div>
    )
}


export default LocationSearchInput;