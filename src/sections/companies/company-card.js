import PropTypes from 'prop-types';
import ArrowDownOnSquareIcon from '@heroicons/react/24/solid/ArrowDownOnSquareIcon';
import ClockIcon from '@heroicons/react/24/solid/ClockIcon';
import { Avatar, Box, Card, CardContent, Divider, Stack, SvgIcon, Button, Typography } from '@mui/material';
import { FileContext } from '../../utils/FileContext';
import { useContext } from 'react';

export const CompanyCard = (props) => {
  const { selectedFile, setSelectedFile, setSelectedContent } = useContext(FileContext);

  const { company } = props;
  const analysisFile = async (file) => {
    setSelectedFile(file);
    const response = await fetch('http://13.41.136.181:3000/api/file?fileName=' + file);
    if (response.ok) {
      const data = await response.json();
      setSelectedContent(data.result);
    } else {
      console.error('Error fetching file:', response.status);
    }
  }
  return (
    <Card
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%'
      }}
    >
      <CardContent>
        <Typography
          align="center"
          color={selectedFile === company?'grey':""}
          gutterBottom
          variant="h6"
        >
          {company}
        </Typography>
      </CardContent>
      <Divider />
      <Stack
        alignItems="center"
        direction="row"
        justifyContent="space-between"
        spacing={2}
        sx={{ p: 2 }}
      >
        <Stack
          alignItems="center"
          direction="row"
          spacing={1}
        >
          <SvgIcon
            color="action"
            fontSize="small"
          >
            <ClockIcon />
          </SvgIcon>
          <Typography
            color="text.secondary"
            display="inline"
            variant="body2"
          >
            {company.slice(3, 5)}/{company.slice(5, 7)}/{company.slice(7, 11)}
          </Typography>
        </Stack>
        <Stack
          alignItems="center"
          direction="row"
        >

          {selectedFile === company ? <Button variant="contained"
            disabled
            onClick={() => analysisFile(company)}>
            Selected
          </Button> : <Button variant="contained"
            onClick={() => analysisFile(company)}>
            Select
          </Button>}
        </Stack>
      </Stack>
    </Card>
  );
};

CompanyCard.propTypes = {
  company: PropTypes.string
};
