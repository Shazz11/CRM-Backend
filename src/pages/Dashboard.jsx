import React, { useEffect, useState } from 'react';
import { Card, CardContent, Typography, Grid } from '@mui/material';
import { BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { getDashboardData } from '../services/apiService';

function DashboardAnalytics() {
  const [salesData, setSalesData] = useState({ daily: 0, weekly: 0, monthly: 0 });
  const [barChartData, setBarChartData] = useState([]);
  const [pieChartData, setPieChartData] = useState([]);

  useEffect(() => {
    getDashboardData()
      .then((res) => {
        if (!res || !res.data || typeof res.data !== 'object') {
          console.error("Invalid API response format");
          return;
        }

        const { todaysSales = 0, weeklySales = [], monthlySales = {} } = res.data;

        setSalesData({
          daily: todaysSales,
          weekly: weeklySales.find((week) => week.name === 'This Week')?.value || 0,
          monthly: Object.values(monthlySales).reduce((acc, val) => acc + val, 0),
        });

        setBarChartData(
          Object.entries(monthlySales).map(([month, revenue]) => ({ name: month, revenue }))
        );

        setPieChartData(weeklySales);
      })
      .catch((error) => console.error("Error fetching dashboard data:", error));
  }, []);

  const COLORS = ['#007FFF', '#ADD8E6'];

  return (
    <div className="flex flex-col gap-5">
      <Grid container spacing={3}>
        {[
          { label: "Daily Sales (Today)", value: salesData.daily },
          { label: "Weekly Sales", value: salesData.weekly },
          { label: "Monthly Sales", value: salesData.monthly }
        ].map((item, index) => (
          <Grid item xs={12} sm={4} key={index}>
            <Card className="shadow-lg">
              <CardContent>
                <Typography variant="h6">{item.label}</Typography>
                <Typography variant="h5">	₹{item.value}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Grid container spacing={3} className="mt-6">
        <Grid item xs={12} md={8}>
          <Card>
            <CardContent>
              <Typography variant="h6">2025 Revenue</Typography>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={barChartData}>
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="revenue" fill="#007FFF" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={4}>
          <Card className="shadow-lg">
            <CardContent>
              <Typography variant="h6">Weekly Sales</Typography>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie data={pieChartData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} fill="#8884d8" label>
                    {pieChartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
}

export default DashboardAnalytics;
