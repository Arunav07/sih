import ChartBarIcon from '@heroicons/react/24/solid/ChartBarIcon';
import CogIcon from '@heroicons/react/24/solid/CogIcon';
import LockClosedIcon from '@heroicons/react/24/solid/LockClosedIcon';
import ShoppingBagIcon from '@heroicons/react/24/solid/ShoppingBagIcon';
import UserIcon from '@heroicons/react/24/solid/UserIcon';
import UserPlusIcon from '@heroicons/react/24/solid/UserPlusIcon';
import UsersIcon from '@heroicons/react/24/solid/UsersIcon';
import XCircleIcon from '@heroicons/react/24/solid/XCircleIcon';
import ChatIcon from '@heroicons/react/24/solid/ChatBubbleBottomCenterTextIcon';
import { SvgIcon } from '@mui/material';
import GavelIcon from '@mui/icons-material/Gavel';

let itemsabc = [];

var isLawyer = false;
if(isLawyer){
  itemsabc.push(  {
    title: 'Services I Offer',
    path: '/services',
    icon: (
      <SvgIcon fontSize="small">
        <UserPlusIcon />
      </SvgIcon>
    )
  },
  {
    title: 'Refer to IPC',
    path: '/ipc',
    icon: (
      <SvgIcon fontSize="small">
        <GavelIcon />
      </SvgIcon>
    )
  },
  {
    title: 'Dashboard',
    path: '/',
    icon: (
      <SvgIcon fontSize="small">
        <ChartBarIcon />
      </SvgIcon>
    )
  },
  {
    title: 'Clients',
    path: '/customers',
    icon: (
      <SvgIcon fontSize="small">
        <UsersIcon />
      </SvgIcon>
    )
  });
}
else{
  itemsabc.push({
    title: 'Find A Lawyer',
    path: '/findlawyer',
    icon: (
      <SvgIcon fontSize="small">
        <UserPlusIcon />
      </SvgIcon>
    )
  },
  {
    title: "My Cases",
    path: "/cases",
    icon: (
      <SvgIcon fontSize="small">
        <ShoppingBagIcon />
      </SvgIcon>
    )},
    {
      title: 'Refer to IPC',
      path: '/ipc',
      icon: (
        <SvgIcon fontSize="small">
          <GavelIcon />
        </SvgIcon>
      )
    }
  )
}

itemsabc.push({
    
      title: 'Chat',
      path: '/chats',
      icon: (
        <SvgIcon fontSize="small">
          <ChatIcon />
        </SvgIcon>
      )
    },
    {
      title: 'Account',
      path: '/account',
      icon: (
        <SvgIcon fontSize="small">
          <UserIcon />
        </SvgIcon>
      )
    },
    {
      title: 'Settings',
      path: '/settings',
      icon: (
        <SvgIcon fontSize="small">
          <CogIcon />
        </SvgIcon>
      )
    },
    {
      title: 'FaQs',
      path: '/settings',
      icon: (
        <SvgIcon fontSize="small">
          <CogIcon />
        </SvgIcon>
      )
    
})

export const items = itemsabc;