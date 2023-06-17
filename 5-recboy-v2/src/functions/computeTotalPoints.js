const computeTotalPoints = (values) => {
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

    return result;
};

export default computeTotalPoints;
