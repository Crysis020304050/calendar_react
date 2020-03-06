import moment from "moment";

export const addHoursToDayTime = (day, time) => {
    return day._isAMomentObject ?
        moment(`${day.clone().format('YYYY-MM-DD')} ${time}`) :
        moment(`${day} ${time}`)
};