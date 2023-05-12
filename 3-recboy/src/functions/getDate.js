function getDate() {
    const newDate = new Date();
    const date = newDate.getDate();
    let month = newDate.getMonth() + 1;
    const year = newDate.getFullYear();
    let day = newDate.getDay();
    let weekDate = newDate.getDay();
    const monthNames = [
        'Janeiro',
        'Fevereiro',
        'Março',
        'Abril',
        'Maio',
        'Junho',
        'Julho',
        'Agosto',
        'Setembro',
        'Outubro',
        'Novembro',
        'Dezembro',
    ];
    const monthName = monthNames[month - 1];

    const dayNames = [
        'Domingo',
        'Segunda-feira',
        'Terça-feira',
        'Quarta-feira',
        'Quinta-feira',
        'Sexta-feira',
        'Sábado',
    ];
    day = dayNames[day];

    if (month < 10) {
        month = `0${month}`;
    } else {
        month;
    }

    return { day, weekDate, date, month, monthName, year };
}

export default getDate;
