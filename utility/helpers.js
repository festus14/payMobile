export const moneyFormatter = val => {
    return (val + '').replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

export const getPercentage = (val, percentage) => {
    if (typeof percentage !== 'number' || typeof val !== 'number') { return 0; }
    return moneyFormatter((val * percentage / 100).toFixed(2));
};

export const getMonth = (val) => {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return months[val - 1];
};
