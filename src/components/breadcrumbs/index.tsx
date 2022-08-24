import React, { FC } from 'react';

import Container from '../container';
import Link from '../link';

import SC from './styled';
import { PATHNAME } from '../../types/enums';
import { useRouter } from 'next/router';
import translations from '../../services/translations';

const rootPathRegex = '^/$';
const subPathRegex = '/[a-zA-Z0-9-_]+';

export interface Route {
  pathPattern: RegExp;
  breadcrumb: Breadcrumb;
  showInSiteMap?: boolean;
  siteMapPath?: string;
  isLink?: boolean;
}

interface Breadcrumb {
  title?: string;
  dynamic: boolean;
}

const routeNotFound: Breadcrumb = {
  title: translations.translate('errorPage.pageNotFound') as string,
  dynamic: false
};

export const routes: Route[] = [
  {
    pathPattern: new RegExp(rootPathRegex),
    breadcrumb: {
      title: translations.translate('header.home') as string,
      dynamic: false
    }
  },
  {
    pathPattern: new RegExp(`^${PATHNAME.ABOUT}$`),
    breadcrumb: {
      title: translations.translate(
        'footer.linkSection.headings.about'
      ) as string,
      dynamic: false
    },
    showInSiteMap: true,
    siteMapPath: PATHNAME.ABOUT
  },
  {
    pathPattern: new RegExp(`^${PATHNAME.FIND_DATA}$`),
    breadcrumb: {
      title: translations.translate('header.findData') as string,
      dynamic: false
    },
    showInSiteMap: true,
    siteMapPath: PATHNAME.FIND_DATA,
    isLink: false
  },
  {
    pathPattern: new RegExp(`^${PATHNAME.SEARCH}$`),
    breadcrumb: {
      title: translations.translate('header.search') as string,
      dynamic: false
    },
    showInSiteMap: true,
    siteMapPath: PATHNAME.SEARCH
  },
  {
    pathPattern: new RegExp(`^${PATHNAME.DATAJEGEREN}$`),
    breadcrumb: {
      title: translations.translate('header.datajegeren') as string,
      dynamic: false
    },
    showInSiteMap: true,
    siteMapPath: PATHNAME.DATAJEGEREN
  },
  {
    pathPattern: new RegExp(`^${PATHNAME.NEWS}$`),
    breadcrumb: {
      title: translations.translate('header.news') as string,
      dynamic: false
    },
    showInSiteMap: true,
    siteMapPath: PATHNAME.NEWS
  },
  {
    pathPattern: new RegExp(`^${PATHNAME.NEWS}${subPathRegex}$`),
    breadcrumb: { title: undefined, dynamic: true }
  },
  {
    pathPattern: new RegExp(`^${PATHNAME.CONTACT}$`),
    breadcrumb: {
      title: translations.translate(
        'footer.linkSection.links.contact'
      ) as string,
      dynamic: false
    },
    showInSiteMap: true,
    siteMapPath: PATHNAME.CONTACT
  },
  {
    pathPattern: new RegExp(`^${PATHNAME.COMMUNITY}$`),
    breadcrumb: {
      title: translations.translate('header.community') as string,
      dynamic: false
    },
    showInSiteMap: true,
    siteMapPath: PATHNAME.COMMUNITY
  },
  {
    pathPattern: new RegExp(
      `^${PATHNAME.SEARCH}${PATHNAME.DATASET_DETAILS}${subPathRegex}$`
    ),
    breadcrumb: { title: undefined, dynamic: true }
  },
  {
    pathPattern: new RegExp(`^${PATHNAME.COMMUNITY_ABOUT}$`),
    breadcrumb: { title: undefined, dynamic: true }
  },
  {
    pathPattern: new RegExp(`^${PATHNAME.COMMUNITY_RECENT}$`),
    breadcrumb: {
      title: translations.translate('community.header.recent') as string,
      dynamic: false
    }
  },
  {
    pathPattern: new RegExp(`^${PATHNAME.COMMUNITY_POPULAR}$`),
    breadcrumb: {
      title: translations.translate('community.header.popular') as string,
      dynamic: false
    }
  },
  {
    pathPattern: new RegExp(`^${PATHNAME.COMMUNITY_TAGS}$`),
    breadcrumb: {
      title: translations.translate('community.header.tags') as string,
      dynamic: false
    }
  },
  {
    pathPattern: new RegExp(`^${PATHNAME.COMMUNITY_TAGS}${subPathRegex}$`),
    breadcrumb: { title: undefined, dynamic: true }
  },
  {
    pathPattern: new RegExp(
      `^${PATHNAME.COMMUNITY}${subPathRegex}${subPathRegex}$`
    ),
    breadcrumb: { title: undefined, dynamic: true }
  },
  {
    pathPattern: new RegExp(
      `^${PATHNAME.COMMUNITY}${subPathRegex}${subPathRegex}${subPathRegex}${subPathRegex}$`
    ),
    breadcrumb: { title: undefined, dynamic: true }
  },
  {
    pathPattern: new RegExp(`^${PATHNAME.ORGANIZATION}${subPathRegex}$`),
    breadcrumb: { title: undefined, dynamic: true }
  },
  {
    pathPattern: new RegExp(`^${PATHNAME.ORGANIZATION}$`),
    breadcrumb: {
      title: translations.translate('header.organizations') as string,
      dynamic: false
    },
    showInSiteMap: true,
    siteMapPath: PATHNAME.ORGANIZATION
  },
  {
    pathPattern: new RegExp(
      `${PATHNAME.ORGANIZATION}${subPathRegex}${PATHNAME.METADATAQUALITY}`
    ),
    breadcrumb: {
      title: translations.translate('header.metadataquality') as string,
      dynamic: false
    }
  },
  {
    pathPattern: new RegExp(
      `${PATHNAME.ORGANIZATION}${subPathRegex}${PATHNAME.METADATAQUALITY}${subPathRegex}`
    ),
    breadcrumb: { title: undefined, dynamic: true }
  },
  {
    pathPattern: new RegExp(`^${PATHNAME.COURSES}$`),
    breadcrumb: {
      title: translations.translate('header.courses') as string,
      dynamic: false
    },
    showInSiteMap: true,
    siteMapPath: PATHNAME.COURSES
  },
  {
    pathPattern: new RegExp(`^${PATHNAME.GUIDANCE}$`),
    breadcrumb: {
      title: translations.translate('header.guidance') as string,
      dynamic: false
    },
    showInSiteMap: true,
    siteMapPath: PATHNAME.GUIDANCE
  },
  {
    pathPattern: new RegExp(`^${PATHNAME.SITEMAP}$`),
    breadcrumb: {
      title: translations.translate(
        'footer.linkSection.links.sitemap'
      ) as string,
      dynamic: false
    }
  },
  {
    pathPattern: new RegExp(`^${PATHNAME.OFFER_DATA}$`),
    breadcrumb: {
      title: translations.translate('header.offerData') as string,
      dynamic: false
    },
    showInSiteMap: true,
    siteMapPath: PATHNAME.OFFER_DATA,
    isLink: false
  },
  {
    pathPattern: new RegExp(`^${PATHNAME.HOW_TO_OFFER_DATA}$`),
    breadcrumb: {
      title: translations.translate('header.howToOfferData') as string,
      dynamic: false
    },
    showInSiteMap: true,
    siteMapPath: PATHNAME.HOW_TO_OFFER_DATA
  },
  {
    pathPattern: new RegExp(`^${PATHNAME.USE_DATA}$`),
    breadcrumb: {
      title: translations.translate('header.useData') as string,
      dynamic: false
    },
    showInSiteMap: true,
    siteMapPath: PATHNAME.USE_DATA
  }
];

const resolveBreadcrumb = (path: string) =>
  routes.find(({ pathPattern }) => pathPattern.test(path))?.breadcrumb ??
  routeNotFound;

const isLink = (path: string) =>
  routes.find(({ pathPattern }) => pathPattern.test(path))?.isLink !== false ??
  true;

interface Props {
  dynamicPageTitles?: string[];
}

const Breadcrumbs: FC<Props> = ({ dynamicPageTitles }) => {
  const router = useRouter();
  const pathList = router.asPath.split('/');
  const cumulativePathArray = pathList.map(
    (subPath, i) => `${pathList.slice(0, i).join('/')}/${subPath}`
  );
  return cumulativePathArray.length > 1 ? (
    <SC.Root>
      <Container>
        <SC.BreadCrumbs>
          {cumulativePathArray.map((subpath, index) => {
            const { title, dynamic } = resolveBreadcrumb(subpath);
            const crumbTitle = dynamic ? dynamicPageTitles?.shift() : title;
            return (
              <SC.BreadCrumb key={subpath}>
                {index < cumulativePathArray.length - 1 && isLink(subpath) && (
                  <Link href={subpath} hideIcon>
                    {crumbTitle}
                  </Link>
                )}
                {(index === cumulativePathArray.length - 1 ||
                  !isLink(subpath)) && <span>{crumbTitle}</span>}
              </SC.BreadCrumb>
            );
          })}
        </SC.BreadCrumbs>
      </Container>
    </SC.Root>
  ) : null;
};

export default Breadcrumbs;
