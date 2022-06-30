import type {
  ClientEnvironmentVariables,
  ServerEnvironmentVariables
} from './src/types';
import { validateEnv } from './src/utils/common';

const ENV = process.env.NEXT_PUBLIC_ENV! ?? 'staging';
const OIDC_ISSUER =
  process.env.NEXT_PUBLIC_OIDC_ISSUER! ??
  'https://sso.staging.fellesdatakatalog.digdir.no/auth/realms/fdk';
const SEARCH_FULLTEXT_HOST =
  process.env.NEXT_PUBLIC_SEARCH_FULLTEXT_HOST! ??
  'https://search.staging.fellesdatakatalog.digdir.no';
const REFERENCE_DATA_HOST =
  process.env.NEXT_PUBLIC_REFERENCE_DATA_HOST! ?? 'https://data.norge.no';
const FDK_PORTAL_HOST =
  process.env.NEXT_PUBLIC_FDK_PORTAL_HOST! ?? 'https://data.norge.no';
const CMS_API_HOST =
  process.env.NEXT_PUBLIC_CMS_API_HOST! ??
  'https://cms-datafabrikken.digdir.no';
const COMMUNITY_API_HOST =
  process.env.NEXT_PUBLIC_COMMUNITY_API_HOST! ??
  'https://datalandsbyen.norge.no';
const METADATA_QUALITY_ASSESSMENT_API =
  process.env.NEXT_PUBLIC_METADATA_QUALITY_ASSESSMENT_API! ??
  'https://metadata-quality.staging.fellesdatakatalog.digdir.no';
const ORGANIZATION_HOST =
  process.env.NEXT_PUBLIC_ORGANIZATION_HOST! ??
  'https://organization-bff.staging.fellesdatakatalog.digdir.no';
const ORGANIZATION_CATALOGUE_HOST =
  process.env.NEXT_PUBLIC_ORGANIZATION_CATALOGUE_HOST! ??
  'https://organization-catalogue.staging.fellesdatakatalog.digdir.no';
const REPORT_API_HOST =
  process.env.NEXT_PUBLIC_REPORT_API_HOST! ??
  'https://reports-bff.staging.fellesdatakatalog.digdir.no';
const STRAPI_API_HOST =
  process.env.NEXT_PUBLIC_STRAPI_API_HOST! ??
  'https://cms.datafabrikken.norge.no';
const FDK_USER_FEEDBACK_SERVICE_BASE_URI =
  process.env.NEXT_PUBLIC_FDK_USER_FEEDBACK_SERVICE_BASE_URI! ??
  'https://europe-west1-digdir-cloud-functions.cloudfunctions.net/user-feedback-service-staging';
const MAILCHIMP_HOST =
  process.env.NEXT_PUBLIC_MAILCHIMP_HOST! ??
  'https://norge.us6.list-manage.com/subscribe/post?u=215524fdb6&amp;id=ba4ff3ce11';
const DATAJEGER_EMAIL_ADDRESS =
  process.env.DATAJEGER_EMAIL_ADDRESS! ??
  'datajegeren.staging@norge.no';
const FDK_MAIL_SERVICE_ENDPOINT =
  process.env.FDK_MAIL_SERVICE_ENDPOINT! ??
  'mail-sender-service.staging.fellesdatakatalog.digdir.no/api/sendmail';
const FDK_MAIL_SERVICE_API_KEY =
  process.env.FDK_MAIL_SERVICE_API_KEY! ??
  '';

const clientEnv: ClientEnvironmentVariables = {
  ENV,
  OIDC_ISSUER,
  SEARCH_FULLTEXT_HOST,
  REFERENCE_DATA_HOST,
  FDK_PORTAL_HOST,
  CMS_API_HOST,
  COMMUNITY_API_HOST,
  METADATA_QUALITY_ASSESSMENT_API,
  ORGANIZATION_HOST,
  ORGANIZATION_CATALOGUE_HOST,
  REPORT_API_HOST,
  STRAPI_API_HOST,
  FDK_USER_FEEDBACK_SERVICE_BASE_URI,
  MAILCHIMP_HOST,
  DATAJEGER_EMAIL_ADDRESS,
  FDK_MAIL_SERVICE_ENDPOINT,
  FDK_MAIL_SERVICE_API_KEY,
};

const OIDC_CLIENT_SECRET = process.env.OIDC_CLIENT_SECRET ?? '';
const FDK_DATASET_PREVIEW_API_KEY =
  process.env.FDK_DATASET_PREVIEW_API_KEY ?? '';

const serverEnv: ServerEnvironmentVariables = {
  OIDC_CLIENT_SECRET,
  FDK_DATASET_PREVIEW_API_KEY
};

export default {
  clientEnv: validateEnv(clientEnv),
  serverEnv: validateEnv(serverEnv)
};
