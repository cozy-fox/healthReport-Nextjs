import PropTypes from 'prop-types';
import { Card, CardContent, Stack, Typography } from '@mui/material';

export const OverviewBudget = (props) => {
  const { sx, title, value } = props;

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
            <Typography variant="h6">
              {value}
            </Typography>
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  );
};

OverviewBudget.prototypes = {
  difference: PropTypes.number,
  positive: PropTypes.bool,
  sx: PropTypes.object,
  value: PropTypes.string.isRequired
};
