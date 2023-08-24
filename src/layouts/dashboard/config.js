import ChartBarIcon from '@heroicons/react/24/solid/ChartBarIcon';
import CogIcon from '@heroicons/react/24/solid/CogIcon';
import LockClosedIcon from '@heroicons/react/24/solid/LockClosedIcon';
import ShoppingBagIcon from '@heroicons/react/24/solid/ShoppingBagIcon';
import UserIcon from '@heroicons/react/24/solid/UserIcon';
import UserPlusIcon from '@heroicons/react/24/solid/UserPlusIcon';
import UsersIcon from '@heroicons/react/24/solid/UsersIcon';
import ElectricBoltIcon from '@mui/icons-material/ElectricBolt';
import { SvgIcon } from '@mui/material';

export const items = [
  {
    title: 'Overview',
    path: '/',
    icon: (
      <SvgIcon fontSize="small">
        <ElectricBoltIcon />
      </SvgIcon>
    )
  },
  {
    title: 'AMH USERS',
    path: '/users',
    icon: (
      <SvgIcon fontSize="small">
        <ElectricBoltIcon />
      </SvgIcon>
    )
  },
  {
    title: 'AMH TABLESPACE INFO DATA AND INDEX',
    path: '/table_space',
    icon: (
      <SvgIcon fontSize="small">
        <ElectricBoltIcon />
      </SvgIcon>
    )
  },
  {
    title: 'AMH DATABASE SIZE GROWTH DETAIL',
    path: '/size_growth',
    icon: (
      <SvgIcon fontSize="small">
        <ElectricBoltIcon />
      </SvgIcon>
    )
  },
  {
    title: 'Datafile SIZE',
    path: '/datafile',
    icon: (
      <SvgIcon fontSize="small">
        <ElectricBoltIcon />
      </SvgIcon>
    )
  },
  {
    title: 'Parameters Utilization Min And Max',
    path: '/database_parameter_size',
    icon: (
      <SvgIcon fontSize="small">
        <ElectricBoltIcon />
      </SvgIcon>
    )
  },
  {
    title: 'CPU/DB Connection Utilization',
    path: '/used_cpu',
    icon: (
      <SvgIcon fontSize="small">
        <ElectricBoltIcon />
      </SvgIcon>
    )
  },
  {
    title: 'Paritions Details AND Message Count',
    path: '/partition',
    icon: (
      <SvgIcon fontSize="small">
        <ElectricBoltIcon />
      </SvgIcon>
    )
  },
  {
    title: ' Incomplete AMH Transactions',
    path: '/incomplete',
    icon: (
      <SvgIcon fontSize="small">
        <ElectricBoltIcon />
      </SvgIcon>
    )
  },
];
