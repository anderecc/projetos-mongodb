import { Link, Outlet } from 'react-router-dom';
import './styles/app.sass';
import Header from './components/Header';
import Footer from './components/Footer';
import { useEffect } from 'react';
import Container from './components/Container';
function App() {
    useEffect(() => {
        document.title = 'Coooder finanças';
    }, []);
    return (
        <>
            <Header />
            <Container classList="d-flex justify-content-center gap-3 align-items-center ">
                <Link to="/dashboard" className="nav-link fs-3 ">
                    Dashboard
                </Link>
                <strong>|</strong>
                <Link to="billingCycles" className="nav-link fs-3 ">
                    Ciclos de pagamento
                </Link>
            </Container>

            <Outlet />
            <Footer />
        </>
    );
}

export default App;
