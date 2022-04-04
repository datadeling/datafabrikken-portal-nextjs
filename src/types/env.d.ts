export interface ClientEnvironmentVariables {
  ENV: string;
  OIDC_ISSUER: string;
  SEARCH_FULLTEXT_HOST: string;
  REFERENCE_DATA_HOST: string;
  FDK_PORTAL_HOST: string;
  CMS_API_HOST: string;
  COMMUNITY_API_HOST: string;
  METADATA_QUALITY_ASSESSMENT_API: string;
  ORGANIZATION_HOST: string;
  ORGANIZATION_CATALOGUE_HOST: string;
  REPORT_API_HOST: string;
  STRAPI_API_HOST: string;
  FDK_USER_FEEDBACK_SERVICE_BASE_URI: string;
}

export interface ServerEnvironmentVariables {
  OIDC_CLIENT_SECRET: string;
  FDK_DATASET_PREVIEW_API_KEY: string;
}
