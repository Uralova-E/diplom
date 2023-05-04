export const timeNormilize = (str) => {
    let time = str.split('+')[0]
    time = time.split(':')[0] + ':' + time.split(':')[1]
    
    return time
}