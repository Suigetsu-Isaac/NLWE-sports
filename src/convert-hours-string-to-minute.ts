export function convertHoursStringToMinutes(hoursString:String){

    const [hours, minutes] = hoursString.split(":").map(Number);

    const minuteAmount = hours * 60 + minutes
    return minuteAmount
}