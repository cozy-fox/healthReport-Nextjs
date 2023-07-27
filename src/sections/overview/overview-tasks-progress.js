import PropTypes from 'prop-types';
import ListBulletIcon from '@heroicons/react/24/solid/ListBulletIcon';
import {
  Avatar,
  Box,
  Card,
  CardContent,
  LinearProgress,
  Stack,
  SvgIcon,
  Typography
} from '@mui/material';
import {Container, Unstable_Grid2 as Grid } from '@mui/material';

export const OverviewTasksProgress = (props) => {
  const { title, data, sx } = props;

  return (
    <Card sx={sx}>
      <CardContent>
        <Stack
          alignItems="flex-start"
          direction="row"
          justifyContent="space-between"
          spacing={3}
        >
          <Stack spacing={1}>
            <Typography
              color="text.secondary"
              gutterBottom
              variant="h5"
            >
            {title}
            </Typography>
            <Grid
              container
              spacing={1}
            >
              {data.map((each,key) =>
                <Grid
                  key={key}
                  xs={12}
                >
                  <Grid container>
                    <Grid xs={12}><Typography variant='h5' color="primary.main">- Parameter {each[0]} :</Typography></Grid>
                    <Grid xs={12}><Typography variant='h6'>{each[1]}</Typography></Grid>
                  </Grid>
                </Grid>
              )}
            </Grid>
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  );
};

OverviewTasksProgress.propTypes = {
  value: PropTypes.number.isRequired,
  sx: PropTypes.object
};
