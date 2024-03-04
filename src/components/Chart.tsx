import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const data = [
    {
        name: 'Jan',
        expense: 4000,
        income: 2400,
        amt: 2400,
    },
    {
        name: 'Feb',
        expense: 3000,
        income: 1398,
        amt: 2210,
    },
    {
        name: 'Mar',
        expense: 2000,
        income: 9800,
        amt: 2290,
    },
    {
        name: 'Apr',
        expense: 2780,
        income: 3908,
        amt: 2000,
    },
    {
        name: 'May',
        expense: 1890,
        income: 4800,
        amt: 2181,
    },
    {
        name: 'Jun',
        expense: 2390,
        income: 3800,
        amt: 2500,
    },
    {
        name: 'Jul',
        expense: 3490,
        income: 4300,
        amt: 2100,
    },
];

export default () => {
    return (
        <ResponsiveContainer width="100%" height="100%">
            <LineChart
                data={data}
                margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                }}
            >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis yAxisId="left" />
                <YAxis yAxisId="right" orientation="right" />
                <Tooltip />
                <Legend />
                <Line yAxisId="left" type="monotone" dataKey="income" stroke="#8884d8" activeDot={{ r: 8 }} />
                <Line yAxisId="right" type="monotone" dataKey="expense" stroke="#82ca9d" />
            </LineChart>
        </ResponsiveContainer>
    );
}

