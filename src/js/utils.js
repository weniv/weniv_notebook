const dateFormat = () => {
    // yyyy-mm-dd-hh-mm-ss korean time
    const date = new Date();
    let format = '';
    format += date.getFullYear() + '-';
    format += date.getMonth() + 1 + '-';
    format += date.getDate() + '-';
    format += date.getHours() + '-';
    format += date.getMinutes() + '-';
    format += date.getSeconds();
    return format;
};
