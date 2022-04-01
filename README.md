# datafabrikken-portal

## What's new in the next js version
- Routing is now handled by the next server through the pages directory. [link to docs](https://nextjs.org/docs/basic-features/pages)
  - Breadcrumbs have been refactored to deal with this
  - The next router also handles localization. To switch client locale `next/link` components can be used with a `locale={"ex"}` prop. [link to docs](https://nextjs.org/docs/advanced-features/i18n-routing)
  - `next/link` is now used to link to internal pages. This component requires a `<a>` child with no props to pass on its href to. [link to docs](https://nextjs.org/docs/api-reference/next/link)
- Most datafetching is now handled server side through getStaticProps. [link to docs](https://nextjs.org/docs/basic-features/data-fetching/overview)
- Images are loaded using `next/image`, with the exception of `.svg` files. [link to docs](https://nextjs.org/docs/api-reference/next/image#required-props)
- Configuration is handled by `./next.config.js`
- Nginx has been replaced by the next server
- When working locally, create a `.env.local` file at root with the following variables:

```
NEXT_PUBLIC_NODE_ENV = "development"
NEXT_PUBLIC_ENV = "development"
NEXT_PUBLIC_OIDC_ISSUER = "https://sso.staging.fellesdatakatalog.digdir.no/auth/realms/fdk"
NEXT_PUBLIC_SEARCH_FULLTEXT_HOST = "https://search.staging.fellesdatakatalog.digdir.no"
NEXT_PUBLIC_REFERENCE_DATA_HOST = "https://data.norge.no"
NEXT_PUBLIC_FDK_PORTAL_HOST = "https://data.norge.no"
NEXT_PUBLIC_CMS_API_HOST = "https://cms-datafabrikken.digdir.no"
NEXT_PUBLIC_COMMUNITY_API_HOST = "https://community.staging.fellesdatakatalog.digdir.no"
NEXT_PUBLIC_METADATA_QUALITY_ASSESSMENT_API = "https://metadata-quality.staging.fellesdatakatalog.digdir.no"
NEXT_PUBLIC_ORGANIZATION_HOST = "https://organization-bff.staging.fellesdatakatalog.digdir.no"
NEXT_PUBLIC_ORGANIZATION_CATALOGUE_HOST = "https://organization-catalogue.staging.fellesdatakatalog.digdir.no"
NEXT_PUBLIC_REPORT_API_HOST = "https://reports-bff.staging.fellesdatakatalog.digdir.no"
NEXT_PUBLIC_STRAPI_API_HOST = "https://cms.datafabrikken.norge.no"
NEXT_PUBLIC_FDK_USER_FEEDBACK_SERVICE_BASE_URI = "https://europe-west1-digdir-cloud-functions.cloudfunctions.net/user-feedback-service-staging"
OIDC_CLIENT_SECRET = "gibberish"
FDK_DATASET_PREVIEW_API_KEY = "gibberish"
NEXT_PUBLIC_DATAFABRIKKEN_CLIENT = "https://datafabrikken.norge.no/"
NEXT_PUBLIC_IMAGES_DRUPAL = "cms-datafabrikken.digdir.no"
NEXT_PUBLIC_IMAGES_STRAPI = "cms.datafabrikken.norge.no"

```


## Description

A landing page (portal) for datafabrikken på datafabrikken.norge.no

## Installation and Usage

- Required tools to run this project:
  - Node.js and npm to run locally on a host machine
  - Docker and Docker Compose to run locally in a container

#### Running application locally on a host machine

- Install dependencies by running `npm install`
- Run `npm start` to start local development server

#### Running application in a Docker container

- Build a Docker container using the following command:
  - `docker build -t datafabrikken-portal .`
- Run the container using the following comand:
  - `docker run -d -p 3000:8080 -t datafabrikken-portal`

#### Running application using Docker Compose

- Run the application using the following command:
  - `docker-compose up -d`

## Environment Variables

- `ENV` - Environment namespace
  - `development`
  - `production`

## Contributing

#### Branching Strategy

Whenever a new change is to be implemented, follow these steps:

- Create a new branch from the master branch
- Implement and commit changes
- Create a pull request for code review

#### Commits

This repository uses conventional commmit format. In order to commit, follow these steps:

- Stage files to be committed
- Run `npm run commit` script

Do not use `--no-verify` flag when making commits.
