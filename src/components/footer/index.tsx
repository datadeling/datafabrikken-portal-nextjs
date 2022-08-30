import React, { FC, memo } from 'react';
import Link from 'next/link';

import SC from './styled';

import Translation from '../translation';
import { PATHNAME } from '../../types/enums';

import FacebookIcon from '../../../public/images/social-facebook.inline.svg';
import LinkedinIcon from '../../../public/images/social-linkedin.inline.svg';
import TwitterIcon from '../../../public/images/social-twitter.inline.svg';

interface Props {}

const Footer: FC<Props> = () => (
  <SC.Footer>
    <SC.Container>
      <SC.ByLine>
        <SC.Title>
          <Translation id='title' />
        </SC.Title>
        <p>
          <Translation id='footer.byLine' />
        </p>
        <p>
          <Translation id='footer.contact.text' />
          <a href='mailto:datafabrikken@norge.no' rel='noopener noreferrer'>
            datafabrikken@norge.no
          </a>
        </p>
        <SC.Social>
          <a
            href='https://www.facebook.com/datafabrikken'
            target='_blank'
            rel='noopener noreferrer'
            title='Facebook'
          >
            <FacebookIcon />
          </a>
          <a
            href='https://www.linkedin.com/company/datafabrikken/'
            target='_blank'
            rel='noopener noreferrer'
            title='Linkedin'
          >
            <LinkedinIcon />
          </a>
          <a
            href='https://twitter.com/datafabrikken'
            target='_blank'
            rel='noopener noreferrer'
            title='Twitter'
          >
            <TwitterIcon />
          </a>
        </SC.Social>
      </SC.ByLine>
      <SC.LinkSection>
        <div>
          <SC.LinkTitle>
            <Translation id='footer.linkSection.headings.about' />
          </SC.LinkTitle>
          <SC.LinkList>
            <li>
              <Link href={PATHNAME.MAIN} passHref>
                <a>
                  <Translation id='footer.linkSection.links.home' />
                </a>
              </Link>
            </li>
            <li>
              <Link href={PATHNAME.ABOUT} passHref>
                <a>
                  <Translation id='footer.linkSection.links.about' />
                </a>
              </Link>
            </li>
            <li>
              <Link href={PATHNAME.COMMUNITY_ABOUT} passHref>
                <a>
                  <Translation id='footer.linkSection.links.communityAbout' />
                </a>
              </Link>
            </li>
            <li>
              <Link href={PATHNAME.NEWS} passHref>
                <a>
                  <Translation id='footer.linkSection.links.news' />
                </a>
              </Link>
            </li>
          </SC.LinkList>
        </div>

        <div>
          <SC.LinkTitle>
            <Translation id='footer.linkSection.headings.usage' />
          </SC.LinkTitle>
          <SC.LinkList>
            <li>
              <a href={PATHNAME.SEARCH}>
                <Translation id='footer.linkSection.links.search' />
              </a>
            </li>
            <li>
              <Link href={PATHNAME.COURSES} passHref>
                <a>
                  <Translation id='footer.linkSection.links.courses' />
                </a>
              </Link>
            </li>
            <li>
              <Link href={PATHNAME.GUIDANCE} passHref>
                <a>
                  <Translation id='footer.linkSection.links.guidance' />
                </a>
              </Link>
            </li>
            <li>
              <a href={PATHNAME.COMMUNITY}>
                <Translation id='footer.linkSection.links.community' />
              </a>
            </li>
            <li>
              <a href={PATHNAME.ORGANIZATION}>
                <Translation id='footer.linkSection.links.organizations' />
              </a>
            </li>
          </SC.LinkList>
        </div>

        <div>
          <SC.LinkTitle>
            <Translation id='footer.linkSection.headings.site' />
          </SC.LinkTitle>
          <SC.LinkList>
            <li>
              <Link href={PATHNAME.CONTACT} passHref>
                <a>
                  <Translation id='footer.linkSection.links.contact' />
                </a>
              </Link>
            </li>
            <li>
              <a href='https://www.digdir.no/om-oss/personvernerklaering/706'>
                <Translation id='footer.linkSection.links.privacy' />
              </a>
            </li>
            <li>
              <a href='https://www.digdir.no/om-oss/informasjonskapsler/707'>
                <Translation id='footer.linkSection.links.cookies' />
              </a>
            </li>
            <li>
              <a href={PATHNAME.SITEMAP}>
                <Translation id='footer.linkSection.links.sitemap' />
              </a>
            </li>
          </SC.LinkList>
        </div>
      </SC.LinkSection>
    </SC.Container>
  </SC.Footer>
);

export default memo(Footer);
