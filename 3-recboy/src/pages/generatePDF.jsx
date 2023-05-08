import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';

import downloadPDF from '@/functions/downloadPDF';

import styles from '../styles/generatePDF/generatePDF.module.sass';

import Container from '@/Components/Container';
import Footer from '@/Components/Footer';
import HeadApp from '@/Components/Head';
import Header from '@/Components/Header';
import Loading from '@/Components/Loading';
import { useRouter } from 'next/router';

const GeneratePDF = () => {
    const { loading, weekToPdf } = useSelector((state) => state.context);
    const { push } = useRouter();

    useEffect(() => {
        if (weekToPdf.values.length === 0) push('/dashboard');
    }, []);

    const renderValuesDay = (values) => {
        return values?.map((item, index) => {
            return (
                <div key={index}>
                    <p style={{ display: 'flex', gap: '1rem' }}>
                        <span>Ponto: {item.name}</span>
                        <strong> Total: R${item.value.toFixed(2)}</strong>
                    </p>
                    <hr />
                </div>
            );
        });
    };

    const renderDays = (values) => {
        return values?.map((item, index) => {
            return (
                <div key={index}>
                    <ul key={index}>
                        <li>
                            <p>
                                <span>{item.date}</span> |{' '}
                                <strong>
                                    Total dia: R${item.total.toFixed(2)}
                                </strong>
                            </p>
                        </li>
                        <li>{renderValuesDay(item.values)}</li>
                    </ul>
                    <br />
                </div>
            );
        });
    };

    const renderWeek = () => {
        const nameWeek = `${weekToPdf.values[0]?.date}-${
            weekToPdf.values[weekToPdf.values?.length - 1]?.date
        }`;
        return (
            <article>
                <h3>
                    <span id="idToPDF">{nameWeek}</span> |{' '}
                    <span>Total semana: R${weekToPdf.total.toFixed(2)}</span>
                </h3>
                <div>{renderDays(weekToPdf.values)}</div>
            </article>
        );
    };

    return (
        <>
            <HeadApp title="Baixar semana - recboy" />
            <Header />
            {loading ? (
                <Loading />
            ) : (
                <Container>
                    <div id="generatePDFContainer">{renderWeek()}</div>
                    <button
                        className={styles.btn_download}
                        onClick={() => downloadPDF()}
                    >
                        Baixar/Compartilhar
                    </button>
                </Container>
            )}
            <Footer />
        </>
    );
};

export default GeneratePDF;
