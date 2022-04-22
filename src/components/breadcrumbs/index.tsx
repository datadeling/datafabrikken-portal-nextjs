import React, { FC } from 'react';

import Container from '../container';
import Link from '../link';

import SC from './styled';
import { PATHNAME } from '../../types/enums';
import { useRouter } from 'next/router';
import translations from '../../services/translations';

const rootPathRegex = '^/$';
const subPathRegex = '/[a-zA-Z0-9-_]+';

interface Route {
  pathPattern: RegExp;
  breadcrumb: Breadcrumb;
}

interface Breadcrumb {
  title?: string;
  dynamic: boolean;
}

const routeNotFound: Breadcrumb = {
  title: translations.translate('errorPage.pageNotFound') as string,
  dynamic: false
};

const routes: Route[] = [
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
      title: translations.translate('header.about') as string,
      dynamic: false
    }
  },
  {
    pathPattern: new RegExp(`^${PATHNAME.FIND_DATA}$`),
    breadcrumb: {
      title: translations.translate('header.findData') as string,
      dynamic: false
    }
  },
  {
    pathPattern: new RegExp(
      `^${PATHNAME.DATA_SOURCES}${PATHNAME.PRIVATE_SECTOR}$`
    ),
    breadcrumb: { title: undefined, dynamic: true }
  },
  {
    pathPattern: new RegExp(
      `^${PATHNAME.GUIDEANCE_AND_COMPETENCE}${PATHNAME.LEGAL_FRAMEWORK}${subPathRegex}$`
    ),
    breadcrumb: { title: undefined, dynamic: true }
  },
  {
    pathPattern: new RegExp(
      `^${PATHNAME.FIND_DATA}${PATHNAME.GUIDEANCE_AND_COMPETENCE}$`
    ),
    breadcrumb: { title: 'Veiledere og kompetanse', dynamic: false }
  },
  {
    pathPattern: new RegExp(
      `^${PATHNAME.FIND_DATA}${PATHNAME.GUIDEANCE_AND_COMPETENCE}${subPathRegex}$`
    ),
    breadcrumb: { title: undefined, dynamic: true }
  },
  {
    pathPattern: new RegExp(`^${PATHNAME.NEWS}$`),
    breadcrumb: {
      title: translations.translate('header.news') as string,
      dynamic: false
    }
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
    }
  },
  {
    pathPattern: new RegExp(`^${PATHNAME.COMMUNITY}$`),
    breadcrumb: {
      title: translations.translate('header.community') as string,
      dynamic: false
    }
  },
  {
    pathPattern: new RegExp(
      `^${PATHNAME.FIND_DATA}${PATHNAME.DATASET_DETAILS}${subPathRegex}$`
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
    }
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
    }
  },
  {
    pathPattern: new RegExp(`^${PATHNAME.GUIDANCE}$`),
    breadcrumb: {
      title: translations.translate('header.guidance') as string,
      dynamic: false
    }
  },
  {
    pathPattern: new RegExp(`^${PATHNAME.GUIDANCE}${subPathRegex}$`),
    breadcrumb: { title: undefined, dynamic: true }
  }
];

const resolveBreadcrumb = (path: string) =>
  routes.find(({ pathPattern }) => pathPattern.test(path))?.breadcrumb ??
  routeNotFound;

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
                {index < cumulativePathArray.length - 1 && (
                  <Link href={subpath} hideIcon>
                    {crumbTitle}
                  </Link>
                )}
                {index === cumulativePathArray.length - 1 && (
                  <span>{crumbTitle}</span>
                )}
              </SC.BreadCrumb>
            );
          })}
        </SC.BreadCrumbs>
      </Container>
    </SC.Root>
  ) : null;
};

export default Breadcrumbs;
