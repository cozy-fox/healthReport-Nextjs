import PropTypes from 'prop-types';
import ArrowDownIcon from '@heroicons/react/24/solid/ArrowDownIcon';
import ArrowUpIcon from '@heroicons/react/24/solid/ArrowUpIcon';
import ListBulletIcon from '@heroicons/react/24/solid/ListBulletIcon';
import UsersIcon from '@heroicons/react/24/solid/UsersIcon';
import { Avatar, Card, CardContent, Stack, SvgIcon, Typography } from '@mui/material';
import { Box, Container, Unstable_Grid2 as Grid } from '@mui/material';

export const OverviewTotalCustomers = (props) => {
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
                    <Grid xs={6}><Typography variant='h6' align='right'>{each[0]} :</Typography></Grid>
                    <Grid xs={6}><Typography variant='h6' align='left'>{each[1]}</Typography></Grid>
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

OverviewTotalCustomers.propTypes = {
  difference: PropTypes.number,
  positive: PropTypes.bool,
  value: PropTypes.string.isRequired,
  sx: PropTypes.object
};

