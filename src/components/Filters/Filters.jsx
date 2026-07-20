import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
    setLocation,
    setVehicleType,
    setEngine,
    setTransmission,
    resetFilters,
} from '../../redux/slices/filtersSlice';

import {
    selectLocation,
    selectVehicleType,
    selectEngine,
    selectTransmission,
} from '../../redux/selectors/filtersSelectors';

import icons from '../../images/icons.svg';

import styles from './Filters.module.css';


const Filters = ({ onSearch, isSearching }) => {
    const dispatch = useDispatch();

    const location = useSelector(selectLocation);
    const vehicleType = useSelector(selectVehicleType);
    const engine = useSelector(selectEngine);
    const transmission = useSelector(selectTransmission);


    const handleLocationChange = (e) => {
        dispatch(setLocation(e.target.value));
    };


    const handleFormChange = (e) => {
        dispatch(setVehicleType(e.target.value));
    };


    const handleEngineChange = (e) => {
        const value = e.target.value;

        dispatch(
            setEngine(engine === value ? '' : value)
        );
    };


    const handleTransmissionChange = (e) => {
        const value = e.target.value;

        dispatch(
            setTransmission(
                transmission === value ? '' : value
            )
        );
    };


    const handleClear = () => {
        dispatch(resetFilters());

        if (onSearch) {
            onSearch();
        }
    };


    const getFormLabel = (form) => {
        const map = {
            alcove: 'Alcove',
            panelTruck: 'Panel Van',
            fullyIntegrated: 'Integrated',
            semiIntegrated: 'Semi Integrated',
        };

        return map[form] || form;
    };


    return (
        <>

            <div className={styles.contentBlock}>

                {/* Location */}

                <div className={styles.field}>

                    <label
                        className={styles.label}
                        htmlFor="location"
                    >
                        Location
                    </label>


                    <div className={styles.locationInputWrapper}>

                        <svg className={styles.locationIcon}>
                            <use href={`${icons}#icon-location`} />
                        </svg>


                        <input
                            id="location"
                            type="text"
                            className={styles.locationInput}
                            placeholder="City"
                            value={location}
                            onChange={handleLocationChange}
                        />

                    </div>

                </div>



                {/* Filters */}

                <div className={styles.filtersWrapper}>

                    <h2 className={styles.filtersTitle}>
                        Filters
                    </h2>


                    {/* Camper form — только текст и радиокнопка */}

                    <fieldset className={styles.fieldset}>

                        <legend className={styles.legend}>
                            Camper form
                        </legend>


                        {[
                            'alcove',
                            'panelTruck',
                            'fullyIntegrated',
                            'semiIntegrated',
                        ].map((form) => (

                            <label
                                key={form}
                                className={styles.radioLabel}
                            >

                                <input
                                    type="radio"
                                    name="form"
                                    value={form}
                                    checked={
                                        vehicleType === form
                                    }
                                    onChange={handleFormChange}
                                    className={styles.radio}
                                />

                                {getFormLabel(form)}

                            </label>

                        ))}

                    </fieldset>



                    {/* Engine */}

                    <fieldset className={styles.fieldset}>

                        <legend className={styles.legend}>
                            Engine
                        </legend>


                        {[
                            'diesel',
                            'petrol',
                            'hybrid',
                            'electric',
                        ].map((eng) => (

                            <label
                                key={eng}
                                className={styles.radioLabel}
                            >

                                <input
                                    type="radio"
                                    name="engine"
                                    value={eng}
                                    checked={
                                        engine === eng
                                    }
                                    onChange={handleEngineChange}
                                    className={styles.radio}
                                />


                                {
                                    eng.charAt(0).toUpperCase() +
                                    eng.slice(1)
                                }

                            </label>

                        ))}

                    </fieldset>



                    {/* Transmission */}

                    <fieldset className={styles.fieldset}>

                        <legend className={styles.legend}>
                            Transmission
                        </legend>


                        {[
                            'automatic',
                            'manual',
                        ].map((trans) => (

                            <label
                                key={trans}
                                className={styles.radioLabel}
                            >

                                <input
                                    type="radio"
                                    name="transmission"
                                    value={trans}
                                    checked={
                                        transmission === trans
                                    }
                                    onChange={
                                        handleTransmissionChange
                                    }
                                    className={styles.radio}
                                />


                                {
                                    trans.charAt(0).toUpperCase() +
                                    trans.slice(1)
                                }

                            </label>

                        ))}

                    </fieldset>


                </div>


            </div>



            {/* Buttons */}

            <div className={styles.buttonsBlock}>


                <button
                    className={styles.searchButton}
                    onClick={onSearch}
                    disabled={isSearching}
                >

                    {
                        isSearching
                            ? 'Searching...'
                            : 'Search'
                    }

                </button>



                <button
                    className={styles.clearButton}
                    onClick={handleClear}
                >

                    <svg
                        width="10.5"
                        height="10.5"
                        viewBox="0 0 10.5 10.5"
                        fill="none"
                        stroke="#000000"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >

                        <path d="M1.5 1.5L9 9M9 1.5L1.5 9" />

                    </svg>


                    Clear filters

                </button>


            </div>

        </>
    );
};


export default Filters;