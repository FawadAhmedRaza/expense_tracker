import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
// @mui
import { Card, CardHeader, Box } from '@mui/material';
// components
import { CustomSmallSelect } from '../../../../components/custom-input';
import Chart, { useChart } from '../../../../components/chart';

// ----------------------------------------------------------------------

AppAreaInstalled.propTypes = {
  chart: PropTypes.object,
  title: PropTypes.string,
  subheader: PropTypes.string,
};

export default function AppAreaInstalled({ title, subheader, chart, ...other }) {
  const { colors, categories, series, options } = chart;

  const [seriesData, setSeriesData] = useState("");

  const chartOptions = useChart({
    colors,
    xaxis: {
      categories,
    },
    ...options,
  });

  useEffect(()=>{
    setSeriesData(series[0]?.month)
  },[series])

  return (
    <Card {...other}>
      <CardHeader
        title={title}
        subheader={subheader}
        action={
          <CustomSmallSelect value={seriesData} onChange={(event) => setSeriesData(event.target.value)}>
            {series.map((option,ind) => (
              <option  key={option.month} value={option.month}>
                {option.month}
              </option>
            ))}
          </CustomSmallSelect>
        }
      />

      {series.map((item) => (
        <Box key={item.month} sx={{ mt: 3, mx: 3 }} dir="ltr">
          {item.month === seriesData && <Chart type="line" series={item.data} options={chartOptions} height={364} />}
        </Box>
      ))}
    </Card>
  );
}
