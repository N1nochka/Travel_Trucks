import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Loader from './components/Loader/Loader';

const HomePage = lazy(() => import('./pages/HomePage/HomePage'));
const Catalog = lazy(() => import('./pages/Catalog/Catalog'));
const CamperDetails = lazy(() => import('./pages/CamperDetails/CamperDetails'));

function App() {
    return (
        <BrowserRouter>
            <Suspense fallback={<Loader />}>
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/catalog" element={<Catalog />} />
                    <Route path="/catalog/:id" element={<CamperDetails />} />
                </Routes>
            </Suspense>
        </BrowserRouter>
    );
}

export default App;