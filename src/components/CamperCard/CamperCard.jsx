import React from 'react';
import icons from '../../images/icons.svg';
import css from './CamperCard.module.css';

// Перетворює службові значення у зрозумілі для користувача назви
const formatLabel = (value) => {
    if (!value) return '';
    const map = {
        petrol: 'Petrol',
        diesel: 'Diesel',
        hybrid: 'Hybrid',
        automatic: 'Automatic',
        manual: 'Manual',
        alcove: 'Alcove',
        panelTruck: 'Panel Van',
        fullyIntegrated: 'Integrated',
        semiIntegrated: 'Semi Integrated',
    };
    return map[value] || value.charAt(0).toUpperCase() + value.slice(1);
};

// Для всіх типів кузова використовується однакова SVG-іконка
const getFormIcon = () => 'icon-Vector';

const CamperCard = ({ camper }) => {
    const engine = camper.engine;
    const transmission = camper.transmission;
    const form = camper.form;

    return (
        <div className={css.card}>
            <div className={css.imageWrapper}>
                <img
                    src={camper.gallery?.[0]?.thumb || 'https://via.placeholder.com/219x240'}
                    alt={camper.name}
                    className={css.image}
                />
            </div>

            <div className={css.info}>
                <div className={css.topRow}>
                    <h2 className={css.name}>{camper.name}</h2>
                    <p className={css.price}>€{camper.price}</p>
                </div>

                <div className={css.ratingLocationRow}>
                    <div className={css.ratingContainer}>
                        <svg className={css.starIcon}>
                            <use href={`${icons}#icon-Star`} />
                        </svg>
                        <span className={css.ratingText}>
                            {camper.rating || '0.0'} ({camper.reviews?.length || 0} Reviews)
                        </span>
                    </div>
                    <div className={css.locationContainer}>
                        <svg className={css.locationIcon}>
                            <use href={`${icons}#icon-location`} />
                        </svg>
                        <span className={css.locationText}>
                            {camper.location || 'Location not specified'}
                        </span>
                    </div>
                </div>

                <p className={css.descriptionLine}>
                    {camper.description || 'No description available.'}
                </p>

                {/* Бейджи: Engine, Transmission, Form */}
                <ul className={css.equipment}>
                    {engine && (
                        <li className={css.equipmentItem}>
                            <svg className={css.icon}>
                                <use href={`${icons}#icon-petrol`} />
                            </svg>
                            <span>{formatLabel(engine)}</span>
                        </li>
                    )}
                    {transmission && (
                        <li className={css.equipmentItem}>
                            <svg className={css.icon}>
                                <use href={`${icons}#icon-automatic`} />
                            </svg>
                            <span>{formatLabel(transmission)}</span>
                        </li>
                    )}
                    {form && (
                        <li className={css.equipmentItem}>
                            {/* Используем иконку Vector для Form */}
                            <svg className={css.icon}>
                                <use href={`${icons}#${getFormIcon()}`} />
                            </svg>
                            <span>{formatLabel(form)}</span>
                        </li>
                    )}
                </ul>

                <a
                    href={`/catalog/${camper.id}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={css.showMoreButton}
                >
                    Show more
                </a>
            </div>
        </div>
    );
};

export default CamperCard;