import React, { memo, FC, useState } from 'react';
import { compose } from 'redux';
import Link from 'next/link';

import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock';

import Translation from '../translation';

import SC from './styled';

import { Trigger, Menu } from '../dropdown-menu';
import { PATHNAME } from '../../types/enums';

interface Props {}

const Header: FC<Props> = () => {
  const [isDropdownMenuOpen, setIsDropdownMenuOpen] = useState(false);

  const bodyElement = document.querySelector('body');

  const openDropdownMenu = () => {
    setIsDropdownMenuOpen(true);
    if (bodyElement) {
      disableBodyScroll(bodyElement);
    }
  };

  const closeDropdownMenu = () => {
    setIsDropdownMenuOpen(false);
    if (bodyElement) {
      enableBodyScroll(bodyElement);
    }
  };

  return (
    <SC.Header>
      <Link href={{ pathname: '', hash: 'main' }} passHref>
        <SC.SkipLink>
          <Translation id='header.mainContent' />
        </SC.SkipLink>
      </Link>
      <SC.Nav role='navigation'>
        <SC.Logo href='/'>
          <Translation id='title' />
        </SC.Logo>
        <SC.NavigationLinks>
          <li>
            <Link href={PATHNAME.ABOUT} passHref>
              <SC.Link>
                <Translation id='header.about' />
              </SC.Link>
            </Link>
          </li>
          <li>
            <Link href={PATHNAME.FIND_DATA} passHref>
              <SC.Link>
                <Translation id='header.findData' />
              </SC.Link>
            </Link>
          </li>
          <li>
            <Link href={PATHNAME.NEWS} passHref>
              <SC.Link>
                <Translation id='header.news' />
              </SC.Link>
            </Link>
          </li>
          <li>
            <Link href={PATHNAME.COURSES} passHref>
              <SC.Link>
                <Translation id='header.courses' />
              </SC.Link>
            </Link>
          </li>
          <li>
            <Link href={PATHNAME.GUIDANCE} passHref>
              <SC.Link>
                <Translation id='header.guidance' />
              </SC.Link>
            </Link>
          </li>
          <li>
            <Link href={PATHNAME.COMMUNITY} passHref>
              <SC.Link>
                <Translation id='header.community' />
              </SC.Link>
            </Link>
          </li>
        </SC.NavigationLinks>
        <SC.DropdownMenu
          isOpen={isDropdownMenuOpen}
          onClose={closeDropdownMenu}
        >
          <Trigger>
            <SC.MenuButton onClick={openDropdownMenu}>
              <SC.Burger open={isDropdownMenuOpen}>
                <div />
                <div />
                <div />
              </SC.Burger>
              <span>Meny</span>
            </SC.MenuButton>
          </Trigger>
          <Menu>
            <SC.Menu>
              <li onClick={() => closeDropdownMenu()}>
                <Link href={PATHNAME.MAIN} passHref>
                  <SC.Link>
                    <Translation id='header.home' />
                  </SC.Link>
                </Link>
              </li>
              <li onClick={() => closeDropdownMenu()}>
                <Link href={PATHNAME.ABOUT} passHref>
                  <SC.Link>
                    <Translation id='header.about' />
                  </SC.Link>
                </Link>
              </li>
              <li onClick={() => closeDropdownMenu()}>
                <Link href={PATHNAME.FIND_DATA} passHref>
                  <SC.Link>
                    <Translation id='header.findData' />
                  </SC.Link>
                </Link>
              </li>
              <li onClick={() => closeDropdownMenu()}>
                <Link href={PATHNAME.NEWS} passHref>
                  <SC.Link>
                    <Translation id='header.news' />
                  </SC.Link>
                </Link>
              </li>
              <li onClick={() => closeDropdownMenu()}>
                <Link href={PATHNAME.COURSES} passHref>
                  <SC.Link>
                    <Translation id='header.courses' />
                  </SC.Link>
                </Link>
              </li>
              <li onClick={() => closeDropdownMenu()}>
                <Link href={PATHNAME.GUIDANCE} passHref>
                  <SC.Link>
                    <Translation id='header.guidance' />
                  </SC.Link>
                </Link>
              </li>
              <li onClick={() => closeDropdownMenu()}>
                <Link href={PATHNAME.COMMUNITY} passHref>
                  <SC.Link>
                    <Translation id='header.community' />
                  </SC.Link>
                </Link>
              </li>
            </SC.Menu>
          </Menu>
        </SC.DropdownMenu>
      </SC.Nav>
    </SC.Header>
  );
};

export default compose<FC>(memo)(Header);
