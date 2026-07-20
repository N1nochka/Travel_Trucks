import { useEffect, useState, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { fetchCampers } from '../../redux/operations/campersOperations';
import { resetCampers } from '../../redux/slices/campersSlice';
import { resetFilters } from '../../redux/slices/filtersSlice';

import {
    selectAllCampers,
    selectCampersLoading,
    selectCampersError,
} from '../../redux/selectors/campersSelectors';

import {
    selectLocation,
    selectVehicleType,
    selectEngine,
    selectTransmission,
} from '../../redux/selectors/filtersSelectors';

import Header from '../../components/Header/Header';
import CamperCard from '../../components/CamperCard/CamperCard';
import Filters from '../../components/Filters/Filters';
import LoadingOverlay from '../../components/LoadingOverlay/LoadingOverlay';

import noCampersImage from '../../images/bg_removal.png';

import css from './Catalog.module.css';

const PER_PAGE = 4;

const Catalog = () => {
    const dispatch = useDispatch();

    const allCampers = useSelector(selectAllCampers);
    const loading = useSelector(selectCampersLoading);
    const error = useSelector(selectCampersError);

    const location = useSelector(selectLocation);
    const vehicleType = useSelector(selectVehicleType);
    const engine = useSelector(selectEngine);
    const transmission = useSelector(selectTransmission);

    const [appliedFilters, setAppliedFilters] = useState({
        vehicleType: null,
        engine: null,
        transmission: null,
    });

    const [isSearching, setIsSearching] = useState(false);
    const [hasSearched, setHasSearched] = useState(false);
    const [visibleCount, setVisibleCount] = useState(PER_PAGE);

    const loadAllCampers = () => {
        dispatch(fetchCampers({ filters: { location } }));
    };

    useEffect(() => {
        loadAllCampers();
    }, [dispatch, location]);

    const filteredCampers = useMemo(() => {
        let result = allCampers;

        if (appliedFilters.vehicleType) {
            result = result.filter(
                camper => camper.form === appliedFilters.vehicleType
            );
        }

        if (appliedFilters.engine) {
            result = result.filter(
                camper => camper.engine === appliedFilters.engine
            );
        }

        if (appliedFilters.transmission) {
            result = result.filter(
                camper =>
                    camper.transmission === appliedFilters.transmission
            );
        }

        return result;
    }, [allCampers, appliedFilters]);

    const visibleCampers = filteredCampers.slice(0, visibleCount);

    const hasMore = visibleCount < filteredCampers.length;

    const handleSearch = () => {
        setIsSearching(true);
        setHasSearched(true);

        setAppliedFilters({
            vehicleType,
            engine,
            transmission,
        });

        loadAllCampers();

        setVisibleCount(PER_PAGE);

        setIsSearching(false);
    };

    const handleLoadMore = () => {
        setVisibleCount(prev => prev + PER_PAGE);
    };

    const handleResetFilters = () => {
        dispatch(resetFilters());

        setAppliedFilters({
            vehicleType: null,
            engine: null,
            transmission: null,
        });

        setHasSearched(false);
        setVisibleCount(PER_PAGE);

        loadAllCampers();
    };

    return (
        <>
            <Header />

            {(loading || isSearching) && <LoadingOverlay />}

            <main className={css.catalog}>
                <div className={css.container}>
                    <aside className={css.filters}>
                        <Filters
                            onSearch={handleSearch}
                            isSearching={isSearching}
                        />
                    </aside>

                    <section className={css.rightColumn}>
                        <div className={css.list}>
                            {error ? (
                                <p className={css.error}>{error}</p>
                            ) : hasSearched &&
                                filteredCampers.length === 0 &&
                                !loading ? (
                                <div className={css.noResults}>
                                    <img
                                        src={noCampersImage}
                                        alt="No campers found"
                                        className={css.noResultsImage}
                                    />

                                    <div className={css.noResultsContent}>
                                        <h2 className={css.noResultsTitle}>
                                            No campers found
                                        </h2>

                                        <p className={css.noResultsText}>
                                            We couldn't find any campers that match your filters.
                                            <br />
                                            Try adjusting your search or clearing some filters.
                                        </p>
                                    </div>

                                    <div className={css.noResultsButtons}>
                                        <button
                                            type="button"
                                            className={css.clearFiltersButton}
                                            onClick={handleResetFilters}
                                        >
                                            <span className={css.closeIcon}>
                                                ×
                                            </span>

                                            <span>
                                                Clear filters
                                            </span>
                                        </button>

                                        <button
                                            type="button"
                                            className={css.viewAllButton}
                                            onClick={handleResetFilters}
                                        >
                                            View all campers
                                        </button>
                                    </div>
                                </div>
                            ) : (
                                visibleCampers.map(camper => (
                                    <CamperCard
                                        key={camper.id}
                                        camper={camper}
                                    />
                                ))
                            )}
                        </div>

                        {!loading && hasMore && (
                            <div className={css.loadMoreWrapper}>
                                <button
                                    className={css.loadMoreButton}
                                    onClick={handleLoadMore}
                                >
                                    Load more
                                </button>
                            </div>
                        )}
                    </section>
                </div>
            </main>
        </>
    );
};

export default Catalog;