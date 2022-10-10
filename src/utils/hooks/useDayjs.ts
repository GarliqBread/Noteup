import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);

export const useDayjs = () => {
  const formatTo = (date: string) => {
    const diff = dayjs().diff(date, "day", true);
    if (diff > 7) {
      return dayjs(date).format("DD-MM-YY");
    } else {
      return dayjs().to(dayjs(date));
    }
  };

  return { formatTo };
};
