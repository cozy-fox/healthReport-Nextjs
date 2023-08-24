import PropTypes from 'prop-types';
import { Box, Typography, Unstable_Grid2 as Grid } from '@mui/material';

// TODO: Change subtitle text

export const Layout = (props) => {
  const { children } = props;

  return (
    <Box
      component="main"
      sx={{
        display: 'flex',
        flex: '1 1 auto'
      }}
    >
      <Grid
        container
        sx={{ flex: '1 1 auto' }}
      >
        <Grid
          xs={12}
          lg={6}
          sx={{
            backgroundColor: 'background.paper',
            display: 'flex',
            flexDirection: 'column',
            position: 'relative'
          }}
        >
          {children}
        </Grid>
        <Grid
          xs={12}
          lg={6}
          sx={{
            alignItems: 'center',
            background: 'radial-gradient(50% 50% at 50% 50%, #122647 0%, #090E23 100%)',
            color: 'white',
            display: 'flex',
            justifyContent: 'center',
            '& img': {
              maxWidth: '100%'
            }
          }}
        >
          <Box sx={{
            p: 3,
            backgroundImage: "url('/assets/auth-illustration.jpg')",
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
            height: "100%",
            width: "100%",
            display: 'flex', // Makes it a flex container
            justifyContent: 'center', //Centers children on the line (this is optional)
            alignItems: 'center',
          }}>
            <Box
              align="center"
              backgroundColor="rgba(255,255,255,0.6)"
              pb={"10px"}
              pt={"20px"}
            >
              <a href="https://www.netlinksdn.com" target="_blank" rel="noopener noreferrer">
                <img
                  src='/assets/logo.png'
                  style={{ width: '50%', marginBottom: '20px', cursor: 'pointer' }}
                />
              </a>
              <Typography
                align="center"
                color="black"
                sx={{
                  lineHeight: '32px',
                  mb: 2
                }}
                variant="h3"
              >
                Welcome to{' '}
                <Box
                  component="span"
                  sx={{ color: 'rgba(99,102,241)' }}
                >
                  NetLinkSDN
                </Box>
              </Typography>
              <Typography
                align="center"
                color="black"
                sx={{ mb: 3 }}
                variant="h6"
              >
                AMH DB HealthCare Check Monitor System
              </Typography>
            </Box>

          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

Layout.prototypes = {
  children: PropTypes.node
};