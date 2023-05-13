import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';

import downloadPDF from '@/functions/downloadPDF';

import styles from '../styles/generatePDF/generatePDF.module.sass';

import Container from '@/Components/Container';
import Footer from '@/Components/Footer';
import HeadApp from '@/Components/Head';
import Header from '@/Components/Header';
import Loading from '@/Components/Loading';

const GeneratePDF = () => {
    const { loading, weekToPdf } = useSelector((state) => state.context);
    const { push } = useRouter();

    useEffect(() => {
        if (weekToPdf.values.length === 0) push('/dashboard');
    }, []);

    const computeTotalPoint = (values) => {
        const allValues = [];
        values.forEach((item) => {
            item.values.forEach((item) => allValues.push({ ...item }));
        });

        const result = allValues.reduce((acc, crr) => {
            const index = acc.findIndex((item) => item.name === crr.name);

            if (index === -1) {
                acc.push({ name: crr.name, value: crr.value });
            } else {
                acc[index] = {
                    name: crr.name,
                    value: crr.value + +acc[index].value,
                };
            }

            return acc;
        }, []);

        return result?.map((item, index) => {
            return (
                <li key={index}>
                    <p style={{ display: 'flex', gap: '1rem' }}>
                        <span>Total ponto: {item.name}</span>
                        <strong> R$ {item.value}</strong>
                    </p>
                </li>
            );
        });
    };

    const renderValuesDay = (values) => {
        return values?.map((item, index) => {
            return (
                <div key={index}>
                    <p style={{ display: 'flex', gap: '1rem' }}>
                        <span>Ponto: {item.name}</span>
                        <span style={{ fontWeight: '600' }}>
                            {' '}
                            Total: R${item.value.toFixed(2)}
                        </span>
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
                </div>
            );
        });
    };

    const renderWeek = () => {
        const nameWeek = `${weekToPdf.values[0]?.date}-${
            weekToPdf.values[weekToPdf.values?.length - 1]?.date
        }`;
        return (
            <article
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '1rem',
                }}
            >
                <h3 style={{ display: 'flex', flexDirection: 'column' }}>
                    <span id="idToPDF">{nameWeek}</span>
                    <span>Total semana: R${weekToPdf.total.toFixed(2)}</span>
                </h3>
                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '1rem',
                    }}
                >
                    {renderDays(weekToPdf.values)}
                </div>
                <ul>{computeTotalPoint(weekToPdf.values)}</ul>
                <h3>
                    <span>Total semana: R${weekToPdf.total.toFixed(2)}</span>
                </h3>
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
