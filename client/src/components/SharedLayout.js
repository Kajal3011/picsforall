import React from 'react'
import Header from './Header';
import UserInfo from './UserInfoBox';
import { Outlet } from 'react-router-dom';

export default function SharedLayout() {
  return (
    <>
      <Header />
      <Outlet />
    </>
  )
}


function SharedLayout2() {
  return (
    <>
      <UserInfo />
      <Outlet />
    </>
  )
}

export { SharedLayout2 };