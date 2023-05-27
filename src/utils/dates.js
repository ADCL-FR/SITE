export function getWeeksInYear(year) {
    const startOfYear = new Date(year, 0, 1);
    const endOfYear = new Date(year, 11, 31);
    const daysInYear = Math.round((endOfYear - startOfYear) / (1000 * 60 * 60 * 24));
    const weeksInYear = Math.floor(daysInYear / 7);

    const weeksArray = [];
    for (let i = 1; i <= weeksInYear; i++) {
        weeksArray.push({ value: i, label: i });
    }

    return weeksArray;
}

export function getYearsRange(range) {
    const currentYear = new Date().getFullYear();
    const startYear = currentYear - range;
    const endYear = currentYear + range;

    const yearsArray = [];
    for (let year = startYear; year <= endYear; year++) {
        yearsArray.push({ value: year, label: year });
    }

    return yearsArray;
}