import React from 'react'
import './TopMenu.scss'
import { Icon, Menu } from 'semantic-ui-react'
import { useAuth } from '../../../hooks'


export function TopMenu() {

  const { auth, logout } = useAuth();

  const renderName = () => {
    if (auth.me?.first_name && auth.me?.last_name) {
      return `${auth.me.first_name} ${auth.me.last_name}`;
    } else {
    return auth.me?.email;
    };
  };

  return (
    <Menu fixed='top' className='top-menu-admin'>
      <Menu.Item className='top-menu-admin__logo'>
        <p>Restaurant Administration</p>
      </Menu.Item>
      <Menu.Menu position='right'>
        <Menu.Item>
          <p>Hola, { renderName() }</p>
        </Menu.Item>
        <Menu.Item onClick={ logout }>
          <Icon name='sign out' />
        </Menu.Item>
      </Menu.Menu>
    </Menu>
  )
}
