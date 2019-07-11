export const moneyFormatter = val => {
    return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export const getPercentage = (val, percentage) => {
    if (typeof percentage !== "number" || typeof val !== "number") return 0
    return moneyFormatter((val * percentage / 100).toFixed(2))
}