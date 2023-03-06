import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { View, Text, ScrollView, Alert } from "react-native";
import { HabitDay, DAY_SIZE } from "../components/HabitDay";
import { Header } from "../components/Header";
import { Loading } from "../components/Loading";
import dayjs from "dayjs";
import { generateDatesFromYearBeginning } from '../utils/generate-dates-from-year-beginning'

import { api } from '../lib/axios'

const weekDays = "DSTQQSS".split('');
const datesFromYearBeginning = generateDatesFromYearBeginning();
const minimumSummaryDatesSizes = 18 * 5;
const amountOfDaysToFill = minimumSummaryDatesSizes - datesFromYearBeginning.length;

type Summary = {
    id: string;
    date: string;
    amount: number;
    completed: number;
}

export function Home() {

    const [isLoading, setLoading] = useState(true);
    const [summary, setSummary] = useState<Summary[]>([]);
    const { navigate } = useNavigation();

    async function fetchData() {
        try {
            setLoading(true);
            const response = await api.get('/summary');
            setSummary(response.data);

        } catch (error) {
            console.log(error);
            Alert.alert('Ops', 'Não foi possível carregar o sumário de hábitos.');
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchData();
    }, []);

    if (isLoading) return <Loading />

    return (
        <View className="flex-1 bg-background px-8 pt-16">
            <Header />

            <View className="flex-row mt-6 mb-2">
                {
                    weekDays.map((weekDay, index) => (
                        <Text
                            key={`${weekDay}-${index}`}
                            className="text-zinc-400 text-xl font-bold text-center mx-1"
                            style={{ width: DAY_SIZE }}
                        >
                            {weekDay}
                        </Text>
                    ))
                }
            </View>

            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: 100 }}
            >

                {
                    summary.length > 0 &&
                    <View className="flex-row flex-wrap">
                        {
                            datesFromYearBeginning.map(date => {
                                const dayWithHabits = summary.find(day => dayjs(date).isSame(day.date, 'day'))
                                return (
                                    <HabitDay
                                        date={date}
                                        amountOfHabits={dayWithHabits?.amount}
                                        amountCompleted={dayWithHabits?.completed}
                                        key={date.toISOString()}
                                        onPress={() => navigate('habit', { date: date.toISOString() })}
                                    />
                                )
                            })
                        }
                        {
                            amountOfDaysToFill > 0 && Array
                                .from({ length: amountOfDaysToFill })
                                .map((_, index) => (<View
                                    key={index}
                                    className="bg-zinc-900 rounded-lg border-2 m-1 border-zinc-800 opacity-40"
                                    style={{ width: DAY_SIZE, height: DAY_SIZE }}
                                />))
                        }
                    </View>
                }
            </ScrollView>





        </View>
    )
}