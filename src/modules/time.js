import dayjs from "dayjs";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";
dayjs.extend(utc);
dayjs.extend(timezone);

export function timeReverseCalculator(time) {
    const endDate = dayjs(time).tz("Asia/Seoul");
    const currentDate = dayjs().tz("Asia/Seoul");
    const subtractedSeconds = endDate.diff(currentDate, "second");
    console.log(endDate, currentDate);
    return {
        subtractedSeconds,
    };
}

export const padNumber = (num, length) => {
    return String(num).padStart(length, "0");
};
