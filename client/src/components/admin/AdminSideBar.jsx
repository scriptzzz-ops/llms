import React from 'react';
import { NavLink } from 'react-router-dom';
import { assets } from '../../assets/assets';

const AdminSideBar = () => {

  const menuItems = [
    { name: 'Dashboard', path: '/admin/dashboard', icon: assets.home_icon },
    { name: 'Educator Requests', path: '/admin/educator-requests', icon: assets.person_tick_icon },
    { name: 'All Educators', path: '/admin/all-educators', icon: assets.my_course_icon },
  ];

  return (
    <div className='md:w-64 w-16 border-r min-h-screen text-base border-gray-500 py-2 flex flex-col'>
      {menuItems.map((item) => (
        <NavLink
          to={item.path}
          key={item.name}
          end={item.path === '/admin/dashboard'} // Add end prop for the Dashboard link
          className={({ isActive }) =>
            `flex items-center md:flex-row flex-col md:justify-start justify-center py-3.5 md:px-10 gap-3 ${isActive
              ? 'bg-indigo-50 border-r-[6px] border-indigo-500/90'
              : 'hover:bg-gray-100/90 border-r-[6px] border-white hover:border-gray-100/90'
            }`
          }
        >
          <img src={item.icon} alt="" className="w-6 h-6" />
          <p className='md:block hidden text-center'>{item.name}</p>
        </NavLink>
      ))}
    </div>
  );
};

export default AdminSideBar;