export const postProcessDataRange = (startDate, endDate) => {
    let dateRange = [];
    
    for(let date = new Date(startDate); date <= new Date(endDate); date.setDate(date.getDate() + 1)) {
        dateRange.push(formatDate(new Date(date)));
    }
    return dateRange;
}

const formatDate = (date) => {
    let month = date.getMonth() + 1;
    let day = date.getDate();
    let year = date.getFullYear();

    if (month <= 9) {
        month = '0' + month;
    }
    if (day <= 9) {
        day = '0' + day;
    } 

    return [year, month, day].join('-');
}
