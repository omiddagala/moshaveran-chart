const fixPersianNumbers = (str) => {
    const persianNumbers = [/۰/g, /۱/g, /۲/g, /۳/g, /۴/g, /۵/g, /۶/g, /۷/g, /۸/g, /۹/g];
    const arabicNumbers = [/٠/g, /١/g, /٢/g, /٣/g, /٤/g, /٥/g, /٦/g, /٧/g, /٨/g, /٩/g];
    if (typeof str === 'string') {
        for (let i = 0; i < 10; i++) {
            str = str.replace(persianNumbers[i], i).replace(arabicNumbers[i], i);
        }
    }
    return str;
};
function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
function mobileValidation(mobile){
    return mobile.match(/09([0-9][0-9]|3[1-9]|2[1-9])-?[0-9]{3}-?[0-9]{4}/)
}

function periodsLabel(name){
    switch (name){
        case 'Roozaneh':
            return 'روزانه';
        case 'Shabaneh':
            return 'شبانه';
        case 'PayamNoor':
            return 'پیام نور';
        case 'Pardis':
            return 'پردیس';
        case 'MajaziDolati':
            return 'مجازی دولتی';
        case 'GheireEntefaei':
            return 'غیر انتفاعی';
        case 'shahriehpardaz':
            return 'شهریه پرداز';
        case 'Moshtarak':
            return 'مشترک';
        case 'MajaziPayamNoor':
            return 'مجازی پیام نور';
        case 'MajaziGheireEntefaei':
            return 'مجازی غیرانتفاعی';
    }
}

function chanceLabel(name){
    switch (name){
        case 'ACCEPTED':
            return ['قبول','success'];
        case 'HIGH_CHANCE':
            return ['پراحتمال','primary'];
        case 'OPTIMISTIC':
            return ['خوشبینانه','warning'];
        case 'NOT_ACCEPTED':
            return ['کم احتمال','danger'];
    }
}

export {fixPersianNumbers,numberWithCommas,mobileValidation,periodsLabel,chanceLabel}
