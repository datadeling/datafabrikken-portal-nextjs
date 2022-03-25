import { validateEnv } from './utils/common';

import { Environment } from './types/enums';

const ENV = process.env.ENV ?? Environment.DEVELOPMENT;
const OIDC_ISSUER =
  process.env.OIDC_ISSUER ??
  'https://sso.staging.fellesdatakatalog.digdir.no/auth/realms/fdk';
const OIDC_CLIENT_SECRET = process.env.OIDC_CLIENT_SECRET ?? '';
const SEARCH_FULLTEXT_HOST =
  process.env.SEARCH_FULLTEXT_HOST ??
  'https://search.staging.fellesdatakatalog.digdir.no';
const REFERENCE_DATA_HOST =
  process.env.REFERENCE_DATA_HOST ?? 'https://data.norge.no';
const FDK_PORTAL_HOST = process.env.FDK_PORTAL_HOST ?? 'https://data.norge.no';
const CMS_API_HOST =
  process.env.CMS_API_HOST ?? 'https://cms-datafabrikken.digdir.no';
const COMMUNITY_API_HOST =
  process.env.COMMUNITY_API_HOST ??
  'https://community.staging.fellesdatakatalog.digdir.no';
const METADATA_QUALITY_ASSESSMENT_API =
  process.env.METADATA_QUALITY_ASSESSMENT_API ??
  'https://metadata-quality.staging.fellesdatakatalog.digdir.no';
const ORGANIZATION_HOST =
  process.env.ORGANIZATION_HOST ??
  'https://organization-bff.staging.fellesdatakatalog.digdir.no';
const ORGANIZATION_CATALOGUE_HOST =
  process.env.ORGANIZATION_CATALOGUE_HOST ??
  'https://organization-catalogue.staging.fellesdatakatalog.digdir.no';
const REPORT_API_HOST =
  process.env.REPORT_API_HOST ??
  'https://reports-bff.staging.fellesdatakatalog.digdir.no';
const FDK_DATASET_PREVIEW_API_KEY =
  process.env.FDK_DATASET_PREVIEW_API_KEY ?? '';
const STRAPI_API_HOST =
  process.env.STRAPI_API_HOST ?? 'https://cms.datafabrikken.norge.no';
const FDK_USER_FEEDBACK_SERVICE_BASE_URI =
  process.env.FDK_USER_FEEDBACK_SERVICE_BASE_URI ??
  'https://europe-west1-digdir-cloud-functions.cloudfunctions.net/user-feedback-service-staging';

const env = {
  ENV,
  OIDC_ISSUER,
  OIDC_CLIENT_SECRET,
  SEARCH_FULLTEXT_HOST,
  REFERENCE_DATA_HOST,
  FDK_PORTAL_HOST,
  CMS_API_HOST,
  COMMUNITY_API_HOST,
  METADATA_QUALITY_ASSESSMENT_API,
  ORGANIZATION_HOST,
  ORGANIZATION_CATALOGUE_HOST,
  REPORT_API_HOST,
  FDK_DATASET_PREVIEW_API_KEY,
  STRAPI_API_HOST,
  FDK_USER_FEEDBACK_SERVICE_BASE_URI
};

export default validateEnv(env);
