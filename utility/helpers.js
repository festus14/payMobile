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

export const reformatDate = (date) => {
    date = date.split('-');
    return new Date(date[2], date[1] - 1, date[0]);
}

export function isAdmin(roles) {
    if (!roles || roles.length < 1) {return false;}
    for (let i = 0; i < roles.length; i++) {
        if (roles[i].id < 4 && roles[i].id > 0) {return true;}
    }

    return false;
}