// Returns the the date a month ago in this format: YYYY-MM-DD
export const getOneMonthAgoReleaseDate = () => {
    let date = new Date();
    date.setMonth(date.getMonth() - 1);
    let formattedDate = date.toJSON().slice(0,10);

    return formattedDate;
}

// Takes argument of date and returns the year in this format: YYYY
export const dateToYearOnly = date => date.slice(0,4);

// Takes argument of string and returns string with the first letter capitalized
export const capitalizeFirstLetter = text => (
    text.charAt(0).toUpperCase() + text.slice(1)
);

export const randomize = data => (
    Math.floor(Math.random() * data.length - 1)
);

export const truncate = (text, n) => (
    text?.length > n ? text.substr(0, n - 1) + "..." : text
);