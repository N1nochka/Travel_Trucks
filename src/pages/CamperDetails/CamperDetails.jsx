import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { fetchCamperById } from '../../redux/operations/campersOperations';
import { clearCurrentCamper } from '../../redux/slices/campersSlice';

import {
    selectCurrentCamper,
    selectCampersLoading,
} from '../../redux/selectors/campersSelectors';

import Header from '../../components/Header/Header';
import Loader from '../../components/Loader/Loader';

import icons from '../../images/icons.svg';
import css from './CamperDetails.module.css';

const CamperDetails = () => {
    const { id } = useParams();
    const dispatch = useDispatch();

    const camper = useSelector(selectCurrentCamper);
    const loading = useSelector(selectCampersLoading);

    const [activeImage, setActiveImage] = useState(0);

    // Состояния для формы
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [nameError, setNameError] = useState('');
    const [emailError, setEmailError] = useState('');
    const [touchedName, setTouchedName] = useState(false);
    const [touchedEmail, setTouchedEmail] = useState(false);

    useEffect(() => {
        dispatch(fetchCamperById(id));

        return () => {
            dispatch(clearCurrentCamper());
        };
    }, [dispatch, id]);

    const formatPrice = price => {
        if (price === undefined || price === null) return '0,00';

        return Number(price)
            .toFixed(2)
            .replace('.', ',');
    };

    const formatFormType = formType => {
        if (!formType) return '';

        switch (formType) {
            case 'panelTruck':
                return 'Panel truck';

            case 'fullyIntegrated':
                return 'Fully integrated';

            case 'alcove':
                return 'Alcove';

            default:
                return formType.charAt(0).toUpperCase() + formType.slice(1);
        }
    };

    // ===== ВАЛИДАЦИЯ =====

    const validateName = (value) => {
        if (!value.trim()) {
            return 'Please enter your name.';
        }
        if (!/^[A-Za-z\s]+$/.test(value)) {
            return 'Name must contain only Latin letters';
        }
        return '';
    };

    const validateEmail = (value) => {
        if (!value.trim()) {
            return 'Please enter your email.';
        }
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
            return 'Please enter a valid email address';
        }
        return '';
    };

    const handleNameChange = (e) => {
        const value = e.target.value;
        setName(value);
        if (touchedName) {
            setNameError(validateName(value));
        }
    };

    const handleEmailChange = (e) => {
        const value = e.target.value;
        setEmail(value);
        if (touchedEmail) {
            setEmailError(validateEmail(value));
        }
    };

    const handleNameBlur = () => {
        setTouchedName(true);
        setNameError(validateName(name));
    };

    const handleEmailBlur = () => {
        setTouchedEmail(true);
        setEmailError(validateEmail(email));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const nameErr = validateName(name);
        const emailErr = validateEmail(email);

        setNameError(nameErr);
        setEmailError(emailErr);
        setTouchedName(true);
        setTouchedEmail(true);

        if (!nameErr && !emailErr) {
            alert('Booking submitted successfully!');
            setName('');
            setEmail('');
            setNameError('');
            setEmailError('');
            setTouchedName(false);
            setTouchedEmail(false);
        }
    };

    // ===== РЕНДЕР =====

    if (loading) {
        return <Loader />;
    }

    if (!camper) {
        return null;
    }

    const gallery = camper.gallery || [];

    const equipment = [
        {
            key: 'transmission',
            label:
                camper.transmission === 'automatic'
                    ? 'Automatic'
                    : camper.transmission,
            icon: 'icon-automatic',
            show: Boolean(camper.transmission),
        },
        {
            key: 'AC',
            label: 'AC',
            icon: 'icon-ac',
            show: camper.AC,
        },
        {
            key: 'engine',
            label:
                camper.engine === 'petrol'
                    ? 'Petrol'
                    : camper.engine,
            icon: 'icon-petrol',
            show: Boolean(camper.engine),
        },
        {
            key: 'kitchen',
            label: 'Kitchen',
            icon: 'icon-kitchen',
            show: camper.kitchen,
        },
        {
            key: 'radio',
            label: 'Radio',
            icon: 'icon-radio',
            show: camper.radio,
        },
        {
            key: 'form',
            label: formatFormType(camper.form),
            icon: 'icon-alcove',
            show: Boolean(camper.form),
        },
    ];

    return (
        <>
            <Header />

            <main className={css.details}>
                <div className={css.container}>
                    {/* ===== ВЕРХНЯЯ ЧАСТЬ ===== */}
                    <section className={css.topSection}>
                        {/* Левая колонка — галерея */}
                        <div className={css.imageAndThumbnails}>
                            <div className={css.mainImageWrapper}>
                                {gallery[activeImage] && (
                                    <img
                                        src={
                                            gallery[activeImage].original ||
                                            gallery[activeImage].thumb
                                        }
                                        alt={camper.name}
                                        className={css.mainImage}
                                    />
                                )}
                            </div>

                            <div className={css.thumbnails}>
                                {gallery.slice(0, 4).map((image, index) => (
                                    <button
                                        key={index}
                                        type="button"
                                        className={`${css.thumbnailButton} ${activeImage === index
                                            ? css.activeThumbnail
                                            : ''
                                            }`}
                                        onClick={() =>
                                            setActiveImage(index)
                                        }
                                    >
                                        <img
                                            src={
                                                image.thumb ||
                                                image.original
                                            }
                                            alt={`${camper.name} ${index + 1
                                                }`}
                                            className={css.thumbnail}
                                        />
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Правая колонка — информация */}
                        <div className={css.infoContainer}>
                            {/* Блок с названием, рейтингом и описанием */}
                            <section className={css.headerRating}>
                                <h1 className={css.title}>
                                    {camper.name}
                                </h1>

                                <div className={css.reviewsLocation}>
                                    <div className={css.rating}>
                                        <svg className={css.starIcon}>
                                            <use
                                                href={`${icons}#icon-Star`}
                                            />
                                        </svg>

                                        <span>
                                            {camper.rating} (
                                            {camper.reviews?.length || 0}{' '}
                                            Reviews)
                                        </span>
                                    </div>

                                    <div className={css.location}>
                                        <svg className={css.mapIcon}>
                                            <use
                                                href={`${icons}#icon-map`}
                                            />
                                        </svg>

                                        <span>
                                            {camper.location}
                                        </span>
                                    </div>
                                </div>

                                <p className={css.price}>
                                    €{formatPrice(camper.price)}
                                </p>

                                <p className={css.description}>
                                    {camper.description}
                                </p>
                            </section>

                            {/* Блок Vehicle details */}
                            <section className={css.vehicleDetails}>
                                <h2 className={css.vehicleTitle}>
                                    Vehicle details
                                </h2>

                                <div className={css.equipment}>
                                    {equipment.map(
                                        item =>
                                            item.show && (
                                                <div
                                                    key={item.key}
                                                    className={
                                                        css.equipmentItem
                                                    }
                                                >
                                                    <svg
                                                        className={
                                                            css.equipmentIcon
                                                        }
                                                    >
                                                        <use
                                                            href={`${icons}#${item.icon}`}
                                                        />
                                                    </svg>

                                                    <span>
                                                        {item.label}
                                                    </span>
                                                </div>
                                            )
                                    )}
                                </div>

                                <div className={css.divider} />

                                <div className={css.vehicleInfo}>
                                    <div className={css.infoRow}>
                                        <span>Form</span>
                                        <span>
                                            {formatFormType(
                                                camper.form
                                            )}
                                        </span>
                                    </div>

                                    <div className={css.infoRow}>
                                        <span>Length</span>
                                        <span>
                                            {camper.length}
                                        </span>
                                    </div>

                                    <div className={css.infoRow}>
                                        <span>Width</span>
                                        <span>
                                            {camper.width}
                                        </span>
                                    </div>

                                    <div className={css.infoRow}>
                                        <span>Height</span>
                                        <span>
                                            {camper.height}
                                        </span>
                                    </div>

                                    <div className={css.infoRow}>
                                        <span>Tank</span>
                                        <span>
                                            {camper.tank}
                                        </span>
                                    </div>

                                    <div className={css.infoRow}>
                                        <span>Consumption</span>
                                        <span>
                                            {camper.consumption}
                                        </span>
                                    </div>
                                </div>
                            </section>
                        </div>
                    </section>

                    {/* ===== НИЖНЯЯ ЧАСТЬ ===== */}
                    <section className={css.reviewsSection}>
                        <h2 className={css.reviewsTitle}>Reviews</h2>

                        <div className={css.reviewsAndBooking}>
                            {/* Отзывы */}
                            <div className={css.reviews}>
                                {camper.reviews?.map((review, index) => (
                                    <div key={index} className={css.review}>
                                        <div className={css.reviewHeader}>
                                            <div
                                                className={css.reviewAvatar}
                                            >
                                                {review.reviewer_name.charAt(
                                                    0
                                                )}
                                            </div>

                                            <div>
                                                <h3>
                                                    {review.reviewer_name}
                                                </h3>

                                                <div
                                                    className={
                                                        css.reviewStars
                                                    }
                                                >
                                                    {[...Array(5)].map(
                                                        (_, starIndex) => (
                                                            <svg
                                                                key={
                                                                    starIndex
                                                                }
                                                                className={
                                                                    css.reviewStar
                                                                }
                                                            >
                                                                <use
                                                                    href={`${icons}#icon-Star`}
                                                                />
                                                            </svg>
                                                        )
                                                    )}
                                                </div>
                                            </div>
                                        </div>

                                        <p>{review.comment}</p>
                                    </div>
                                ))}
                            </div>

                            {/* Booking form */}
                            <div className={css.booking}>
                                <div className={css.bookingHeader}>
                                    <h2>Book your campervan now</h2>
                                    <p>
                                        Stay connected! We are always ready
                                        to help you.
                                    </p>
                                </div>

                                <form
                                    className={css.bookingForm}
                                    onSubmit={handleSubmit}
                                >
                                    <div className={css.inputs}>
                                        {/* Поле Name */}
                                        <div className={css.inputWrapper}>
                                            <div
                                                className={`${css.inputContainer
                                                    } ${nameError &&
                                                        touchedName
                                                        ? css.error
                                                        : ''
                                                    }`}
                                            >
                                                {nameError &&
                                                    touchedName && (
                                                        <span
                                                            className={
                                                                css.errorLabel
                                                            }
                                                        >
                                                            Name*
                                                        </span>
                                                    )}
                                                <input
                                                    type="text"
                                                    placeholder={
                                                        nameError &&
                                                            touchedName
                                                            ? ''
                                                            : 'Name*'
                                                    }
                                                    value={name}
                                                    onChange={
                                                        handleNameChange
                                                    }
                                                    onBlur={
                                                        handleNameBlur
                                                    }
                                                    className={
                                                        css.bookingInput
                                                    }
                                                />

                                                {nameError &&
                                                    touchedName && (
                                                        <svg
                                                            className={
                                                                css.errorIcon
                                                            }
                                                            width="20"
                                                            height="20"
                                                            viewBox="0 0 20 20"
                                                            fill="none"
                                                        >
                                                            <circle
                                                                cx="10"
                                                                cy="10"
                                                                r="9"
                                                                stroke="#E44848"
                                                                strokeWidth="1.5"
                                                            />
                                                            <path
                                                                d="M10 6V10.5M10 13.5H10.01"
                                                                stroke="#E44848"
                                                                strokeWidth="1.5"
                                                                strokeLinecap="round"
                                                            />
                                                        </svg>
                                                    )}
                                            </div>

                                            {nameError && touchedName && (
                                                <p
                                                    className={
                                                        css.errorText
                                                    }
                                                >
                                                    {nameError}
                                                </p>
                                            )}
                                        </div>

                                        {/* Поле Email */}
                                        <div className={css.inputWrapper}>
                                            <div
                                                className={`${css.inputContainer
                                                    } ${emailError &&
                                                        touchedEmail
                                                        ? css.error
                                                        : ''
                                                    }`}
                                            >
                                                {emailError &&
                                                    touchedEmail && (
                                                        <span
                                                            className={
                                                                css.errorLabel
                                                            }
                                                        >
                                                            Email*
                                                        </span>
                                                    )}
                                                <input
                                                    type="text"
                                                    placeholder={
                                                        emailError &&
                                                            touchedEmail
                                                            ? ''
                                                            : 'Email*'
                                                    }
                                                    value={email}
                                                    onChange={
                                                        handleEmailChange
                                                    }
                                                    onBlur={
                                                        handleEmailBlur
                                                    }
                                                    className={
                                                        css.bookingInput
                                                    }
                                                />

                                                {emailError &&
                                                    touchedEmail && (
                                                        <svg
                                                            className={
                                                                css.errorIcon
                                                            }
                                                            width="20"
                                                            height="20"
                                                            viewBox="0 0 20 20"
                                                            fill="none"
                                                        >
                                                            <circle
                                                                cx="10"
                                                                cy="10"
                                                                r="9"
                                                                stroke="#E44848"
                                                                strokeWidth="1.5"
                                                            />
                                                            <path
                                                                d="M10 6V10.5M10 13.5H10.01"
                                                                stroke="#E44848"
                                                                strokeWidth="1.5"
                                                                strokeLinecap="round"
                                                            />
                                                        </svg>
                                                    )}
                                            </div>

                                            {emailError &&
                                                touchedEmail && (
                                                    <p
                                                        className={
                                                            css.errorText
                                                        }
                                                    >
                                                        {emailError}
                                                    </p>
                                                )}
                                        </div>
                                    </div>

                                    <button
                                        type="submit"
                                        className={css.sendButton}
                                    >
                                        Send
                                    </button>
                                </form>
                            </div>
                        </div>
                    </section>
                </div>
            </main>
        </>
    );
};

export default CamperDetails;