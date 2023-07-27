import { useCallback, useMemo, useState } from 'react';
import Head from 'next/head';
import { subDays, subHours } from 'date-fns';
import ArrowDownOnSquareIcon from '@heroicons/react/24/solid/ArrowDownOnSquareIcon';
import ArrowUpOnSquareIcon from '@heroicons/react/24/solid/ArrowUpOnSquareIcon';
import PlusIcon from '@heroicons/react/24/solid/PlusIcon';
import { Box, Button, Container, Stack, SvgIcon, Typography, Unstable_Grid2 as Grid } from '@mui/material';
import { Avatar, Card, CardContent, Divider } from '@mui/material';
import { useSelection } from 'src/hooks/use-selection';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import { CustomersTable } from 'src/sections/customer/customers-table';
import { CustomersSearch } from 'src/sections/customer/customers-search';
import { applyPagination } from 'src/utils/apply-pagination';
import { OverviewSales } from 'src/sections/overview/overview-sales';
import { FileContext } from '../utils/FileContext';
import { useContext } from 'react';
import { CompanyCard } from 'src/sections/companies/company-card';

const Page = () => {
  const { selectedContent } = useContext(FileContext);
  const data = selectedContent !== null ? selectedContent.listener : [];
  return (
    <>
      <Head>
        <title>
          Companies | Devias Kit
        </title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8
        }}
      >
        <Container maxWidth="xl">
          <Stack spacing={3}>
            <Stack
              direction="row"
              justifyContent="space-between"
            >
              <Stack spacing={1}>
                <Typography variant="h4">
                Oracle Database LISTENERER STATUS
                </Typography>
              </Stack>
            </Stack>
            <Grid
              container
            >
              {data.map((file) => (
                <Grid
                  xs={12}
                  key={file}
                >
                        {file}
                </Grid>
              ))}
            </Grid>
          </Stack>
        </Container>
      </Box>
    </>
  );
};

Page.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default Page;
