import PropTypes from 'prop-types';
import { StaticDateTimePicker } from '@mui/x-date-pickers/StaticDateTimePicker';
import BellIcon from '@heroicons/react/24/solid/BellIcon';
import KeyboardDoubleArrowUpIcon from '@mui/icons-material/KeyboardDoubleArrowUp';
import Bars3Icon from '@heroicons/react/24/solid/Bars3Icon';
import KeyboardDoubleArrowDownIcon from '@mui/icons-material/KeyboardDoubleArrowDown';
import MagnifyingGlassIcon from '@heroicons/react/24/solid/MagnifyingGlassIcon';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import {
  Avatar,
  Badge,
  Box,
  IconButton, InputBase, Popover,
  Stack,
  SvgIcon,
  Tooltip,
  useMediaQuery
} from '@mui/material';
import { useContext } from 'react';
import { alpha } from '@mui/material/styles';
import { usePopover } from 'src/hooks/use-popover';
import { AccountPopover } from './account-popover';
import { useCalendar } from 'src/hooks/use-popCalendar';
import { FileContext } from '../../utils/FileContext';
import { useRouter } from 'next/router'

const SIDE_NAV_WIDTH = 280;
const TOP_NAV_HEIGHT = 64;

export const TopNav = (props) => {
  const { onNavOpen } = props;
  const router = useRouter();
  const { setRange, setSearch, setSort, search, sort, range } = useContext(FileContext);
  const lgUp = useMediaQuery((theme) => theme.breakpoints.up('lg'));
  const accountPopover = usePopover();
  const calendarPopover = useCalendar();

  return (
    <>
      <Box
        component="header"
        sx={{
          backdropFilter: 'blur(6px)',
          backgroundColor: (theme) => alpha(theme.palette.background.default, 0.5),
          position: 'sticky',
          left: {
            lg: `${SIDE_NAV_WIDTH}px`
          },
          top: 0,
          width: {
            lg: `calc(100% - ${SIDE_NAV_WIDTH}px)`
          },
          zIndex: (theme) => theme.zIndex.appBar
        }}
      >
        <Stack
          alignItems="center"
          direction="row"
          justifyContent="space-between"
          spacing={2}
          sx={{
            minHeight: TOP_NAV_HEIGHT,
            px: 2
          }}
        >
          <Stack
            alignItems="center"
            direction="row"
            spacing={2}
            width="70%"
          >
            {!lgUp && (
              <IconButton onClick={onNavOpen}>
                <SvgIcon fontSize="small">
                  <Bars3Icon />
                </SvgIcon>
              </IconButton>
            )}
            <SvgIcon fontSize="small">
              <MagnifyingGlassIcon />
            </SvgIcon>
            <InputBase
              sx={{
                ml: 1,
                width: "100%",
                height: "100%",
                flex: 1,
                borderBottom: '1px grey solid',
                display: open ? 'flex' : 'none',
              }}
              placeholder="Search Oracle File"
              inputProps={{ 'aria-label': 'search file' }}
              value={search}
              onChange={e => { setSearch(e.target.value); }}
            />
          </Stack>
          <Stack
            alignItems="center"
            direction="row"
            spacing={2}
          >
             {router.pathname === '/select_file' && (   
            <Tooltip title="Sort By Date Ranges">
              <IconButton
                onClick={calendarPopover.handleOpen}
                ref={calendarPopover.anchorRef}
              >
                <SvgIcon fontSize="small">
                  <CalendarMonthIcon />
                </SvgIcon>
              </IconButton>
            </Tooltip>)}
            {router.pathname === '/select_file' && (            
            <Tooltip title="Sort By Time">
              <IconButton
                onClick={() => { sort === 'recent' ? setSort('late') : setSort('recent') }}
              >
                <SvgIcon fontSize="small">
                  {sort == 'recent' ? <KeyboardDoubleArrowUpIcon /> : <KeyboardDoubleArrowDownIcon />}
                </SvgIcon>
              </IconButton>
            </Tooltip>)}

            <Avatar
              onClick={accountPopover.handleOpen}
              ref={accountPopover.anchorRef}
              sx={{
                cursor: 'pointer',
                height: 40,
                width: 40
              }}
              src="/assets/avatars/avatar-anika-visser.png"
            />
          </Stack>
        </Stack>
      </Box>
      <AccountPopover
        anchorEl={accountPopover.anchorRef.current}
        open={accountPopover.open}
        onClose={accountPopover.handleClose}
      />

      <Popover
        anchorEl={calendarPopover.anchorRef.current}
        anchorOrigin={{
          horizontal: 'left',
          vertical: 'bottom'
        }}
        onClose={calendarPopover.handleClose}
        open={calendarPopover.open}
      >
        <Stack direction={"row"}>
          <StaticDateTimePicker
            value={range[0]}
            onChange={(e) => { setRange([e, range[1]]); console.log(range) }}
            orientation="landscape"
          />
          <StaticDateTimePicker
            value={range[1]}
            onChange={(e) => { setRange([range[0], e]); console.log(range) }}
            orientation="landscape"
          />
        </Stack>
      </Popover>
    </>
  );
};

TopNav.propTypes = {
  onNavOpen: PropTypes.func
};
