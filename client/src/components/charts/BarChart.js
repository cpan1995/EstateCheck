import { useEffect, useState } from 'react'
import { Bar } from 'react-chartjs-2'

export default function BarChart({expenses, revenues}){

    const MONTHS = [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December'
    ];

    let expensesData = []
    let revenuesData = []

    MONTHS.forEach(month => {
        expensesData.push(expenses[month])
        revenuesData.push(revenues[month])
    })

    const labels = MONTHS;
    const data = {
        labels: labels,
        datasets: [
            {
            label: 'Expenses',
            data: expensesData,
            borderColor: 'rgba(217,126,118,255)',
            backgroundColor: 'rgb(217,126,118,0.8)',
            borderWidth: 2,
            borderRadius: Number.MAX_VALUE,
            borderSkipped: false,
            },
            {
            label: 'Revenue',
            data: revenuesData,
            borderColor: 'rgba(122,190,142,255)',
            backgroundColor: 'rgb(122,190,142, 0.8)',
            borderWidth: 2,
            borderRadius: Number.MAX_VALUE,
            borderSkipped: false,
            }
        ]
    };
    const options = {
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
          },
          title: {
            display: true,
            text: 'Monthly Stats'
          }
        }
    }

    return (
        <div>
            <Bar 
                data = {data}
                options={options}
            />
        </div>
    )
}