import type { NextPage } from 'next';
import Link from 'next/link';

import Breadcrumbs, { Route, routes } from '../../components/breadcrumbs';
import Head from '../../components/head';
import Root from '../../components/root';
import translations from '../../services/translations';
import SC from '../../styles/pages/nettstedkart';

interface Props {}

const sortByTitle = () => (a: Route, b: Route) => {
  const a1 = a.breadcrumb.title?.toLowerCase() ?? '';
  const b1 = b.breadcrumb.title?.toLowerCase() ?? '';
  if (a1 !== b1) {
    return a1 > b1 ? 1 : -1;
  }
  return b1.length - a1.length;
};

const SiteMapPage: NextPage<Props> = () => (
  <>
    <Head
      title={translations.translate('siteMapPage.title') as string}
      description={translations.translate('siteMapPage.subTitle') as string}
    />
    <Breadcrumbs />
    <Root>
      <SC.Header>
        <SC.Container>
          <SC.Title>{translations.translate('siteMapPage.title')}</SC.Title>
          <SC.Subtitle>
            {translations.translate('siteMapPage.subTitle')}
          </SC.Subtitle>
        </SC.Container>
      </SC.Header>
      <SC.Container>
        <SC.SiteMapRoot>
          <SC.SiteMapLeaf>
            <Link href='/' passHref>
              <SC.SiteMapLink>
                {translations.translate('header.home')}
              </SC.SiteMapLink>
            </Link>
            <SC.SiteMapBranch>
              {routes
                .filter(({ showInSiteMap }) => showInSiteMap)
                .sort(sortByTitle())
                .map(({ siteMapPath = '', breadcrumb }) => (
                  <SC.SiteMapLeaf>
                    <Link href={siteMapPath} passHref prefetch={false}>
                      <SC.SiteMapLink>{breadcrumb.title}</SC.SiteMapLink>
                    </Link>
                  </SC.SiteMapLeaf>
                ))}
            </SC.SiteMapBranch>
          </SC.SiteMapLeaf>
        </SC.SiteMapRoot>
      </SC.Container>
    </Root>
  </>
);

export default SiteMapPage;