import { Dimensions, TouchableOpacity, TouchableOpacityProps } from "react-native";
import { getProgressPercent } from "../utils/progress-percent";
import clsx from "clsx";
import dayjs from "dayjs";

const WEEK_DAYS = 7;
const SCREEN_HORIZONTAL_PADDING = (32 * 2) / 5;

export const DAY_MARGIN_BETWEEN = 8;
export const DAY_SIZE = (Dimensions.get("screen").width / WEEK_DAYS) - (SCREEN_HORIZONTAL_PADDING + 5);


interface Props extends TouchableOpacityProps {
    amountOfHabits?: number;
    amountCompleted?: number;
    date: Date;
}

export function HabitDay({ amountOfHabits = 0, amountCompleted = 0, date, ...others }: Props) {

    const amountAccomplishedPercent =
        amountOfHabits > 0 ? getProgressPercent(amountOfHabits, amountCompleted) : 0;

    const today = dayjs().startOf('day').toDate();
    const isCurrentDay = dayjs(date).isSame(today);

    const isBetween = (value: number, n1: number, n2: number) => value >= n1 && value <= n2;

    return (
        <TouchableOpacity
            className={clsx("rounded-lg border-2 m-1", {
                ["bg-zinc-900 border-zinc-800"]: amountAccomplishedPercent == 0,
                ["bg-violet-900 border-violet-700"]: isBetween(amountAccomplishedPercent, 1, 20),
                ["bg-violet-800 border-violet-600"]: isBetween(amountAccomplishedPercent, 21, 40),
                ["bg-violet-700 border-violet-500"]: isBetween(amountAccomplishedPercent, 41, 60),
                ["bg-violet-600 border-violet-500"]: isBetween(amountAccomplishedPercent, 61, 80),
                ["bg-violet-500 border-violet-400"]: amountAccomplishedPercent > 80,
                ["border-white border-4"]: isCurrentDay
            })}
            style={{ width: DAY_SIZE, height: DAY_SIZE }}
            activeOpacity={0.7}
            {...others}
        />
    )
}