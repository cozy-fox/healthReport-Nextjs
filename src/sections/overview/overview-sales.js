import PropTypes from 'prop-types';
import ArrowPathIcon from '@heroicons/react/24/solid/ArrowPathIcon';
import ArrowRightIcon from '@heroicons/react/24/solid/ArrowRightIcon';
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Divider,
  SvgIcon
} from '@mui/material';
import { alpha, useTheme } from '@mui/material/styles';
import { Chart } from 'src/components/chart';



export const OverviewSales = (props) => {
  const { title, users, chartSeries, sx } = props;
  const useChartOptions = () => {
    const theme = useTheme();
  
    return {
      chart: {
        background: 'transparent',
        stacked: false,
        toolbar: {
          show: false
        }
      },
      colors: [theme.palette.primary.main, alpha(theme.palette.primary.main, 0.25)],
      dataLabels: {
        enabled: false
      },
      fill: {
        opacity: 1,
        type: 'solid'
      },
      grid: {
        borderColor: theme.palette.divider,
        strokeDashArray: 2,
        xaxis: {
          lines: {
            show: false
          }
        },
        yaxis: {
          lines: {
            show: true
          }
        }
      },
      legend: {
        show: false
      },
      plotOptions: {
        bar: {
          columnWidth: '40px'
        }
      },
      stroke: {
        colors: ['transparent'],
        show: true,
        width: 2
      },
      theme: {
        mode: theme.palette.mode
      },
      xaxis: {
        axisBorder: {
          color: theme.palette.divider,
          show: true
        },
        axisTicks: {
          color: theme.palette.divider,
          show: true
        },
        categories: users,
        labels: {
          offsetY: 5,
          style: {
            colors: theme.palette.text.secondary
          }
        }
      },
      yaxis: {
        labels: {
          formatter: (value) => (value > 0 ? `${value}K` : `${value}`),
          offsetX: -10,
          style: {
            colors: theme.palette.text.secondary
          }
        }
      }
    };
  };
  const chartOptions = useChartOptions();

  return (
    <Card sx={sx}>
      <CardHeader
        title={title}
      />
      <CardContent>
        <Chart
          height={350}
          options={chartOptions}
          series={chartSeries}
          type="bar"
          width="100%"
        />
      </CardContent>
    </Card>
  );
};

OverviewSales.protoTypes = {
  title:PropTypes.string,
  users:PropTypes.array,
  chartSeries: PropTypes.array.isRequired,
  sx: PropTypes.object
};
