export const convertDateToYYYYMMDD = (date) => {
    const year = date.split('.')[2]
    const month = date.split('.')[1]
    const day = date.split('.')[0]

    return(year + '-' + month + '-' + day)
} 