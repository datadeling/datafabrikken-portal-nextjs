import React, { memo, FC, useState, useRef, useEffect } from 'react';
import { compose } from 'redux';
import Link from 'next/link';

import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock';

import Translation from '../translation';

import SC from './styled';

import { Trigger, Menu } from '../dropdown-menu';
import { PATHNAME } from '../../types/enums';

import Logo from '../../../public/images/datafabrikken-logo.inline.svg';

interface Props {}

const useMountEffect = (fun: any) => useEffect(fun, []);

const useOnOutsideClick = (handleOutsideClick: { (): void }) => {
  const innerBorderRef = useRef<HTMLUListElement | null>(null);

  const onClick = (event: any) => {
    if (
      innerBorderRef.current &&
      (!innerBorderRef.current.contains(event.target) ||
        event.target.tagName === 'A')
    ) {
      handleOutsideClick();
    }
  };

  useMountEffect(() => {
    document.addEventListener('click', onClick, true);
    return () => {
      document.removeEventListener('click', onClick, true);
    };
  });

  return { innerBorderRef };
};

const Header: FC<Props> = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isFindDataMenuOpen, setIsFindDataMenuOpen] = useState(false);
  const [isOfferDataMenuOpen, setIsOfferDataMenuOpen] = useState(false);

  const { innerBorderRef: findDataMenuRef } = useOnOutsideClick(() =>
    setIsFindDataMenuOpen(false)
  );
  const { innerBorderRef: offerDataMenuRef } = useOnOutsideClick(() =>
    setIsOfferDataMenuOpen(false)
  );

  const bodyElement =
    typeof window !== 'undefined' && document.querySelector('body');

  const openMobileMenu = () => {
    setIsMobileMenuOpen(true);
    if (bodyElement) {
      disableBodyScroll(bodyElement);
    }
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
    if (bodyElement) {
      enableBodyScroll(bodyElement);
    }
  };

  const openFindDataMenu = () => {
    setIsFindDataMenuOpen(true);
  };

  const openOfferDataMenu = () => {
    setIsOfferDataMenuOpen(true);
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
          <Logo viewBox='0 0 272 44' />
        </SC.Logo>
        <SC.NavigationLinks>
          <li>
            <SC.Link onClick={openFindDataMenu}>
              <Translation id='header.findData' />
              <SC.ExpandIcon />
            </SC.Link>
            <SC.Submenu $open={isFindDataMenuOpen} ref={findDataMenuRef}>
              <li>
                <SC.Link href={`${PATHNAME.SEARCH}`}>
                  <Translation id='header.search' />
                </SC.Link>
              </li>
              <li>
                <Link href={`${PATHNAME.DATAJEGEREN}`} passHref>
                  <SC.Link>
                    <Translation id='header.datajegeren' />
                  </SC.Link>
                </Link>
              </li>
              <li>
                <Link href={`${PATHNAME.USE_DATA}`} passHref>
                  <SC.Link>
                    <Translation id='header.useData' />
                  </SC.Link>
                </Link>
              </li>
            </SC.Submenu>
          </li>
          <li>
            <SC.Link onClick={openOfferDataMenu}>
              <Translation id='header.offerData' />
              <SC.ExpandIcon />
            </SC.Link>
            <SC.Submenu $open={isOfferDataMenuOpen} ref={offerDataMenuRef}>
              <li>
                <Link href={`${PATHNAME.HOW_TO_OFFER_DATA}`} passHref>
                  <SC.Link>
                    <Translation id='header.howToOfferData' />
                  </SC.Link>
                </Link>
              </li>
              <li>
                <SC.Link href={PATHNAME.LEGAL_GUIDE} target={'_blank'}>
                  <Translation id='header.legalGuide' />
                </SC.Link>
              </li>
            </SC.Submenu>
          </li>
          <li>
            <Link href={PATHNAME.COURSES} passHref>
              <SC.Link>
                <Translation id='header.courses' />
              </SC.Link>
            </Link>
          </li>
          <li>
            <Link href={`${PATHNAME.GUIDANCE}`} passHref>
              <SC.Link>
                <Translation id='header.guidance' />
              </SC.Link>
            </Link>
          </li>
          <li>
            <SC.Link href={PATHNAME.COMMUNITY}>
              <Translation id='header.community' />
            </SC.Link>
          </li>
          <li>
            <Link href={PATHNAME.NEWS} passHref>
              <SC.Link>
                <Translation id='header.news' />
              </SC.Link>
            </Link>
          </li>
        </SC.NavigationLinks>
        <SC.MobileMenu isOpen={isMobileMenuOpen} onClose={closeMobileMenu}>
          <Trigger>
            <SC.MenuButton onClick={openMobileMenu}>
              <span>Meny</span>
              <SC.Burger open={isMobileMenuOpen}>
                <div />
                <div />
                <div />
              </SC.Burger>
            </SC.MenuButton>
          </Trigger>
          <Menu>
            <SC.Menu>
              <li onClick={() => closeMobileMenu()}>
                <Link href={PATHNAME.MAIN} passHref>
                  <SC.Link>
                    <Translation id='header.home' />
                  </SC.Link>
                </Link>
              </li>
              <li onClick={() => closeMobileMenu()}>
                <span>
                  <Translation id='header.findData' />
                </span>
                <ul>
                  <li>
                    <SC.Link href={`${PATHNAME.SEARCH}`}>
                      <Translation id='header.search' />
                    </SC.Link>
                  </li>
                  <li>
                    <Link href={`${PATHNAME.DATAJEGEREN}`} passHref>
                      <SC.Link>
                        <Translation id='header.datajegeren' />
                      </SC.Link>
                    </Link>
                  </li>
                  <li>
                    <Link href={`${PATHNAME.USE_DATA}`} passHref>
                      <SC.Link>
                        <Translation id='header.useData' />
                      </SC.Link>
                    </Link>
                  </li>
                </ul>
              </li>
              <li onClick={() => closeMobileMenu()}>
                <span>
                  <Translation id='header.offerData' />
                </span>
                <ul>
                  <li>
                    <Link href={`${PATHNAME.HOW_TO_OFFER_DATA}`} passHref>
                      <SC.Link>
                        <Translation id='header.howToOfferData' />
                      </SC.Link>
                    </Link>
                  </li>
                  <li>
                    <SC.Link href={PATHNAME.LEGAL_GUIDE} target={'_blank'}>
                      <Translation id='header.legalGuide' />
                    </SC.Link>
                  </li>
                </ul>
              </li>
              <li onClick={() => closeMobileMenu()}>
                <Link href={PATHNAME.COURSES} passHref>
                  <SC.Link>
                    <Translation id='header.courses' />
                  </SC.Link>
                </Link>
              </li>
              <li onClick={() => closeMobileMenu()}>
                <Link href={PATHNAME.GUIDANCE} passHref>
                  <SC.Link>
                    <Translation id='header.guidance' />
                  </SC.Link>
                </Link>
              </li>
              <li onClick={() => closeMobileMenu()}>
                <SC.Link href={PATHNAME.COMMUNITY}>
                  <Translation id='header.community' />
                </SC.Link>
              </li>
              <li onClick={() => closeMobileMenu()}>
                <Link href={PATHNAME.NEWS} passHref>
                  <SC.Link>
                    <Translation id='header.news' />
                  </SC.Link>
                </Link>
              </li>
            </SC.Menu>
          </Menu>
        </SC.MobileMenu>
      </SC.Nav>
    </SC.Header>
  );
};

export default compose<FC>(memo)(Header);
