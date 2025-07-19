"use client";
import { Card, CardHeader, CardTitle, CardDescription, CardAction, CardContent, CardFooter } from "@/components/ui/card";
import { endOfDay, startOfDay } from 'date-fns';
import React, { useState, useMemo } from "react";
import { XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { format, subDays } from 'date-fns';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { AreaChart, Area } from "recharts";
const DATE_RANGES = {
    "7D": { label: "Last 7 Days", days: 7 },
    "1M": { label: "Last Month", days: 30 },
    "3M": { label: "Last 3 Months", days: 90 },
    "6M": { label: "Last 6 Months", days: 180 },
    ALL: { label: "All Time", days: null },
};
const AccountChart = ({ transactions }) => {
    const [dateRange, setDateRange] = useState("1M");

    const filteredData = useMemo(() => {
        const range = DATE_RANGES[dateRange];
        const now = new Date();
        const startDate = range.days ? startOfDay(subDays(now, range.days)) : startOfDay(new Date(0));

        const filtered = transactions.filter((t) => new Date(t.date) >= startDate && new Date(t.date) <= endOfDay(now)
        )

        const grouped = filtered.reduce((acc, transaction) => {
            const date = format(new Date(transaction.date), "yyyy-MM-dd");
            if (!acc[date]) {
                acc[date] = { date, income: 0, expense: 0 };
            }

            if (transaction.type === "INCOME") {
                acc[date].income += Number(transaction.amount);
            } else {
                acc[date].expense += Number(transaction.amount);
            }
            return acc;
        }, {});


        //convert to array and sort by date
        return Object.values(grouped).sort((a, b) => new Date(a.date) - new Date(b.date)
        );

    }, [transactions, dateRange]);
    console.log("Filtered Data:", filteredData);

    console.log("Transactions:", transactions);

    const totals = useMemo(() => {
        return filteredData.reduce((acc, day) => ({
            income: acc.income + day.income,
            expense: acc.expense + day.expense,
        }), { income: 0, expense: 0 });
    }, [filteredData]);
    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-7">
                <CardTitle className="text-base font-normal">
                    Transaction Overview</CardTitle>
                <Select defaultValue={dateRange} onValueChange={setDateRange}>
                    <SelectTrigger className="w-[140px]">
                        <SelectValue placeholder="Select range" />
                    </SelectTrigger>
                    <SelectContent>
                        {Object.entries(DATE_RANGES).map(([key, { label }]) => {
                            return (
                                <SelectItem key={key} value={key}>
                                    {label}
                                </SelectItem>
                            );
                        })}
                    </SelectContent>
                </Select>
            </CardHeader>
            <CardContent>
                <div className="flex justify-around mb-6 text-sm">
                    <div className="text-center">
                        <p className="text-muted-foreground">Total Income</p>
                        <p className="text-lg font-bold text-green-500">${totals.income.toFixed(2)}</p>
                    </div>
                    <div className="text-center">
                        <p className="text-muted-foreground">Total Expense</p>
                        <p className="text-lg font-bold text-red-500">${totals.expense.toFixed(2)}</p>
                    </div>
                    <div className="text-center">
                        <p className="text-muted-foreground">Net</p>
                        <p className={`text-lg font-bold ${totals.income - totals.expense >= 0 ? 'text-green-500' : 'text-red-500'
                            }`}>${(totals.income - totals.expense).toFixed(2)}</p>
                    </div>
                </div>
                <div className="h-[300px]">

                    {<ResponsiveContainer width="100%" height="100%">
    <AreaChart
      data={filteredData}
      margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
    >
      <defs>
        <linearGradient id="incomeColor" x1="0" y1="0" x2="0" y2="1">
          <stop offset="5%" stopColor="#22c55e" stopOpacity={0.8} />
          <stop offset="95%" stopColor="#22c55e" stopOpacity={0} />
        </linearGradient>
        <linearGradient id="expenseColor" x1="0" y1="0" x2="0" y2="1">
          <stop offset="5%" stopColor="#ef4444" stopOpacity={0.8} />
          <stop offset="95%" stopColor="#ef4444" stopOpacity={0} />
        </linearGradient>
      </defs>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="date" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Area
        type="monotone"
        dataKey="income"
        stroke="#22c55e"
        fillOpacity={1}
        fill="url(#incomeColor)"
      />
      <Area
        type="monotone"
        dataKey="expense"
        stroke="#ef4444"
        fillOpacity={1}
        fill="url(#expenseColor)"
      />
    </AreaChart>
  </ResponsiveContainer>
                    }


                </div>
            </CardContent>

        </Card>



    );
};

export default AccountChart;