import { LOG } from "./env";

export const fnLog = (message) => {
    if(LOG){
        console.log(`[${curtime('yyyy-MM-dd HH:mm:ss')}] ${message}`);
    }
}

const curtime = (format) => {
    let curtime = new Date();
    let yyyy = curtime.getFullYear().toString();
    let MM = pad(curtime.getMonth() + 1,2);
    let dd = pad(curtime.getDate(), 2);
    let HH = pad(curtime.getHours(), 2);
    let mm = pad(curtime.getMinutes(), 2);
    let ss = pad(curtime.getSeconds(), 2);
    return format.replace(/yyyy/g, yyyy).replace(/MM/g, MM).replace(/dd/g, dd).replace(/HH/g, HH).replace(/mm/g, mm).replace(/ss/g, ss);
}

const pad = (number, length) => {
    let str = '' + number;
    while (str.length < length) {
        str = '0' + str;
    }
    return str;
}

