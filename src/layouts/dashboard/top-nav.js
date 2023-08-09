import { StaticDateTimePicker } from '@mui/x-date-pickers/StaticDateTimePicker';
import BellIcon from '@heroicons/react/24/solid/BellIcon';
import KeyboardDoubleArrowUpIcon from '@mui/icons-material/KeyboardDoubleArrowUp';
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
import { alpha } from '@mui/material/styles';
import { usePopover } from 'src/hooks/use-popover';

const SIDE_NAV_WIDTH = 280;
const TOP_NAV_HEIGHT = 64;

export const TopNav = (props) => {
  const lgUp = useMediaQuery((theme) => theme.breakpoints.up('lg'));
  const accountPopover = usePopover();
  return (
    <>
      <Box
        component="header"
        sx={{
          backdropFilter: 'blur(6px)',
          backgroundColor: (theme) => alpha(theme.palette.background.default, 0.5),
          position: 'sticky',
          top: 0,
          width: {
            lg: `calc(100%)`
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
              value={props.search}
              onChange={e=>{ props.setSearch(e.target.value);}}
            />
          </Stack>
          <Stack
            alignItems="center"
            direction="row"
            spacing={2}
          >
            <Tooltip title="Sort By Date Ranges">
              <IconButton
                onClick={accountPopover.handleOpen}
                ref={accountPopover.anchorRef}
              >
                {/* <Badge
                  badgeContent={4}
                  color="success"
                  variant="dot"
                > */}
                  <SvgIcon fontSize="small">
                    <CalendarMonthIcon />
                  </SvgIcon>
                {/* </Badge> */}
              </IconButton>
            </Tooltip>
            <Tooltip title="Sort By Time">
              <IconButton
                onClick={()=>{props.sort==='recent'?props.setSort('late'):props.setSort('recent')}}
              >
                <SvgIcon fontSize="small">
                  {props.sort=='recent'?<KeyboardDoubleArrowUpIcon />:<KeyboardDoubleArrowDownIcon />}
                </SvgIcon>
              </IconButton>
            </Tooltip>
          </Stack>
        </Stack>
        <Popover
          anchorEl={accountPopover.anchorRef.current}
          anchorOrigin={{
            horizontal: 'left',
            vertical: 'bottom'
          }}
          onClose={accountPopover.handleClose}
          open={accountPopover.open}
        >
          <Stack direction={"row"}>
            <StaticDateTimePicker
            value={props.range[0]}
            onChange={(e)=>{props.setRange([e, props.range[1]]); console.log(props.range)}} 
            orientation="landscape" 
            />
            <StaticDateTimePicker 
            value={props.range[1]}
            onChange={(e)=>{props.setRange([props.range[0], e]); console.log(props.range)}} 
            orientation="landscape" 
            />
          </Stack>
        </Popover>
      </Box>

    </>
  );
};

