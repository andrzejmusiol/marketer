import { format } from "date-fns";

export const chartDataFromatter = (date: number) => format(new Date(date * 1000), 'EEEE (HH:mm)')