function yearOptions() {
    const yearNow = new Date().getFullYear();
    const listYear = [];
    for (let i = 0; i < 70; i++) {
        const xxx = {
            value: yearNow - i,
            label: `${yearNow - i}`
        }
        listYear.push(xxx);
    }
    return listYear;
}

export { yearOptions }