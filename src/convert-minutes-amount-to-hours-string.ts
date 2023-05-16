export function convertMinutesAmountToHourString(minuteAmount: number){

    const hour = Math.floor(minuteAmount/60);
    const minute = minuteAmount%60;

    return `${String(hour).padStart(2,'0')}:${String(minute).padStart(2,'0')}`

}