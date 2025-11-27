import { format } from "date-fns";

export const chartDataFromatter = (date: number) => format(new Date(date * 1000), 'dd.MM - HH:mm')