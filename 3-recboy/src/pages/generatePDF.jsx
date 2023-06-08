import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';

import downloadPDF from '@/functions/downloadPDF';

import styles from '../styles/generatePDF/generatePDF.module.sass';

import Container from '@/Components/Container';
import Loading from '@/Components/Loading';
import Link from 'next/link';
import Layout from '@/Components/Layout';
import computeTotalPoints from '@/functions/computeTotalPoints';

const GeneratePDF = () => {
    const { loading, weekToPdf } = useSelector((state) => state.context);
    const { push } = useRouter();

    useEffect(() => {
        if (weekToPdf.values.length === 0) push('/dashboard');
    }, []);

    const renderTotalPoints = (values) => {
        const result = computeTotalPoints(values);
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
                <ul>{renderTotalPoints(weekToPdf.values)}</ul>
                <h3>
                    <span>Total semana: R${weekToPdf.total.toFixed(2)}</span>
                </h3>
            </article>
        );
    };

    return (
        <Layout title="Fechamento da semana">
            {loading ? (
                <Loading />
            ) : (
                <Container>
                    <div id="generatePDFContainer">{renderWeek()}</div>
                    <div>
                        <button
                            className={styles.btn_download}
                            onClick={() => downloadPDF()}
                        >
                            Baixar/Compartilhar
                        </button>
                        <Link className={styles.link_back} href={'/dashboard'}>
                            Voltar
                        </Link>
                    </div>
                </Container>
            )}
        </Layout>
    );
};

export default GeneratePDF;
