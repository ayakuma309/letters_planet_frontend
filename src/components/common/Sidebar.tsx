import React, { useState } from 'react';
import Link from 'next/link';
import { useAuth } from '@/context/auth';

import { BsArrowLeftCircle } from 'react-icons/bs';
import { ImYoutube2 } from 'react-icons/im';
import { GiPerspectiveDiceSixFacesRandom } from 'react-icons/gi';
// import { IoMdLogIn } from 'react-icons/io';
import { IoMdLogOut } from 'react-icons/io';
import { SiQiita } from 'react-icons/si';
import { FaSearch } from 'react-icons/fa';
import { BiSolidBookAlt } from 'react-icons/bi';
import { GiArchiveResearch } from 'react-icons/gi';
const Sidebar = () => {
  const [open, setOpen] = useState(false);
  const { user, logout } = useAuth();

  const Menus = [
    { title: 'youtube', path: '/posts_page', src: <ImYoutube2 /> },
    {
      title: 'random',
      path: '/random_page',
      src: <GiPerspectiveDiceSixFacesRandom />,
    },
    { title: 'Qiita', path: '/qiitas', src: <SiQiita /> },
    { title: 'Book', path: '/books', src: <BiSolidBookAlt /> },
  ];

  //ログイン後のメニュー
  const LoginAfterMenus = [
    { title: 'Qiita', path: '/qiita_search', src: <FaSearch /> },
    { title: 'Book', path: '/book_search', src: <GiArchiveResearch /> },
  ];

  return (
    <>
      <div
        className={`${
          open ? 'w-72' : 'w-20'
        } hidden sm:block relative h-screen duration-300 bg-gray-100 p-5 dark:bg-slate-800 shadow-lg`}
      >
        <BsArrowLeftCircle
          className={`${
            !open && 'rotate-180'
          } absolute text-3xl bg-white fill-slate-800  rounded-full cursor-pointer top-9 -right-4 dark:fill-gray-400 dark:bg-gray-800`}
          onClick={() => setOpen(!open)}
        />
        <div className='flex gap-x-4 items-center'>
          <span
            className={`text-xl font-medium whitespace-nowrap dark:text-white ${
              !open && 'scale-0'
            }`}
          >
            Letters Tube
          </span>
        </div>

        <ul className='pt-6'>
          {Menus.map((menu, index) => (
            <Link href={menu.path} key={index}>
              <li className='flex items-center gap-x-4 p-3 text-base font-normal rounded-lg cursor-pointer dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700'>
                <span className='text-2xl'>{menu.src}</span>
                <span
                  className={`${
                    !open && 'hidden'
                  } origin-left duration-300 hover:block`}
                >
                  {menu.title}
                </span>
              </li>
            </Link>
          ))}
        </ul>
        <ul>
          {user && (
            <>
              {LoginAfterMenus.map((menu, index) => (
                <Link href={menu.path} key={index}>
                  <li className='flex items-center gap-x-4 p-3 text-base font-normal rounded-lg cursor-pointer dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700'>
                    <span className='text-2xl'>{menu.src}</span>
                    <span
                      className={`${
                        !open && 'hidden'
                      } origin-left duration-300 hover:block`}
                    >
                      {menu.title}
                    </span>
                  </li>
                </Link>
              ))}
              <li
                onClick={logout}
                className={`flex items-center gap-x-4 p-3 text-base font-normal rounded-lg cursor-pointer dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700`}
              >
                <span className='text-2xl'>
                  <IoMdLogOut />
                </span>
                <span
                  className={`${
                    !open && 'hidden'
                  } origin-left duration-300 hover:block`}
                >
                  logout
                </span>
              </li>
            </>
            // ) : (
            //   <Link href={`/signup`}>
            //     <li
            //       className={`flex items-center gap-x-4 p-3 text-base font-normal rounded-lg cursor-pointer dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700`}
            //     >
            //       <span className='text-2xl'>
            //         <IoMdLogIn />
            //       </span>
            //       <span
            //         className={`${
            //           !open && 'hidden'
            //         } origin-left duration-300 hover:block`}
            //       >
            //         signup
            //       </span>
            //     </li>
            //   </Link>
            // )}
          )}
        </ul>
      </div>
    </>
  );
};

export default Sidebar;
