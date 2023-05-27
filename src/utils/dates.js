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

// Function to get first Thursday of a specific year
function getFirstThursdayOfYear(year) {
    let date = new Date(year, 0, 1);
    // Get the day number with Monday as first (0)
    let day = (date.getDay() + 6) % 7;
    // Get the date of the first Thursday of the year
    date.setDate(date.getDate() + (3 - day + 7) % 7);
    return date;
}

// Function to get date from week number and year
export function getDateFromWeek(year, week) {
    // Get first Thursday of year
    let firstThursday = getFirstThursdayOfYear(year);
    // Get the date of the first Monday of the year
    let firstMonday = new Date(firstThursday);
    firstMonday.setDate(firstMonday.getDate() - 3);
    // Add (week number - 1) * 7 to get the Monday of the given week
    let date = new Date(firstMonday.setDate(firstMonday.getDate() + ((week - 1) * 7)));
    // Convert date to YYYY-MM-DD format
    let formattedDate = date.getFullYear() + '-' +
        ('0' + (date.getMonth() + 1)).slice(-2) + '-' +
        ('0' + date.getDate()).slice(-2);
    return formattedDate;
}

// calculate the week number
export function getWeekNumber(d, year) {
    d = new Date(Date.UTC(year, d.getMonth(), d.getDate()));
    d.setUTCDate(d.getUTCDate() + 4 - (d.getUTCDay() || 7));
    var yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
    var weekNo = Math.ceil(((d - yearStart) / 86400000 + 1) / 7);
    return weekNo;
}
