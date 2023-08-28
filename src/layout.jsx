import React from 'react';
import Navbar from "./assets/components/navBar";
import BottomBar from './assets/components/bottomBar';

const Layout = ({ children, displayRegularPosts, displayFollowingPosts }) => {
  return (
    <div className="mx-2 my-2 md:max-w-2xl md:mx-auto ">
      <Navbar />
      <main className='overflow-y-auto mb-10 pb-20'>{children}</main>
      <BottomBar
        displayRegularPosts={displayRegularPosts}
        displayFollowingPosts={displayFollowingPosts}
      />
    </div>
  );
}

export default Layout;
