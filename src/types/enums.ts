export enum PATHNAME {
  MAIN = '/',
  FIND_DATA = '/finn-data',
  SEARCH = '/finn-data/sok',
  USE_DATA = '/finn-data/bruke-data',
  DATAJEGEREN = '/finn-data/datajegeren',
  OFFER_DATA = '/tilby-data',
  HOW_TO_OFFER_DATA = '/tilby-data/hvordan-tilby-data',
  DATASETS = '/sok-datasett',
  ABOUT = '/om-datafabrikken',
  NEWS = '/nyheter',
  COMMUNITY = '/datalandsbyen',
  COMMUNITY_POPULAR = '/datalandsbyen/populaer',
  COMMUNITY_RECENT = '/datalandsbyen/siste',
  COMMUNITY_TAGS = '/datalandsbyen/emneord',
  COMMUNITY_ABOUT = '/datalandsbyen/om-datalandsbyen',
  CONTACT = '/kontakt',
  DATASET_DETAILS = '/datasett',
  FDK_PUBLIC_SERVICES = '/public-services',
  FDK_DATA_SERVICES = '/dataservices',
  FDK_CONCEPTS = '/concepts',
  ORGANIZATION = '/virksomheter',
  METADATAQUALITY = '/metadatakvalitet',
  COURSES = '/kurs',
  GUIDANCE = '/veiledning',
  SITEMAP = '/nettstedkart',
  LEGAL_GUIDE = '/juridisk-veiviser-for-datadeling'
}

export enum PARAGRAPH {
  BODY = 'paragraph--body',
  IMAGE = 'paragraph--image',
  VIDEO = 'paragraph--video',
  QUOTE = 'paragraph--quote',
  INFO_BOX = 'paragraph--law_text',
  MAIN_ELEMENT = 'paragraph--user_input_container'
}

export enum Environment {
  DEVELOPMENT = 'development',
  STAGING = 'staging',
  PRODUCTION = 'production'
}

export enum Entity {
  DATASET = 'dataset'
}

export enum AccessRight {
  PUBLIC = 'PUBLIC',
  RESTRICTED = 'RESTRICTED',
  NON_PUBLIC = 'NON_PUBLIC'
}

export enum DataFormat {
  JSON = 'application/json',
  CSV = 'text/csv',
  XML = 'application/xml',
  YAML = 'application/x.yaml',
  GEOJSON = 'application/vnd.geo+json',
  HTML = 'text/html',
  SOSI = 'application/x-ogc-sosi',
  XLSX = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  XLS = 'application/vnd.sealed-xls',
  RSS = 'text/xml',
  RDF_XML = 'application/rdf+xml',
  TURTLE = 'text/turtle',
  JSONLD = 'application/ld+json',
  TXT = 'text/plain',
  SIRI = 'application/x.siri',
  UNKNOWN = 'unknown'
}

export enum GoogleAnalyticsTrackingId {
  DATAFABRIKKEN = 'G-FFPJE1KZ19',
  COMMUNITY = 'G-WVFGGM6DCG'
}

export enum CommunityTemplateTag {
  FORMER_USER = 'global:former_user',
  POST_DELETED = 'topic:post_is_deleted',
  CALENDAR_EVENT_TITLE = 'calendar:event_title'
}

export enum MediaTypeOrExtentType {
  MEDIA_TYPE = 'MEDIA_TYPE',
  FILE_TYPE = 'FILE_TYPE',
  UNKNOWN = 'UNKNOWN'
}

export enum RatingCategory {
  EXCELLENT = 'excellent',
  GOOD = 'good',
  SUFFICIENT = 'sufficient',
  POOR = 'poor'
}

export enum DimensionType {
  ACCESSIBILITY = 'accessibility',
  FINDABILITY = 'findability',
  INTEROPERABILITY = 'interoperability',
  READABILITY = 'readability',
  REUSABILITY = 'reusability'
}

export enum IndicatorType {
  DISTRIBUTABLE_DATA = 'distributableData',
  KEYWORD_USAGE = 'keywordUsage',
  SUBJECT_USAGE = 'subjectUsage',
  GEO_SEARCH = 'geoSearch',
  CONTROLLED_VOCABULARY_USAGE = 'controlledVocabularyUsage',
  LICENSE_INFORMATION = 'licenseInformation',
  CONTACT_POINT = 'contactPoint',
  TITLE = 'title',
  TITLE_NO_ORG_NAME = 'titleNoOrgName',
  DESCRIPTION = 'description',
  DESCRIPTION_WITHOUT_TITLE = 'descriptionWithoutTitle'
}

export enum Filter {
  LASTXDAYS = 'last_x_days',
  OPENDATA = 'opendata',
  ACCESSRIGHTS = 'accessrights',
  PROVENANCE = 'provenance',
  SUBJECTEXISTS = 'subjectExists',
  FORMAT = 'format',
  LOS = 'losTheme',
  ORGPATH = 'orgPath',
  ORGANIZATION_NUMBER = 'organizationNumber',
  THEME = 'theme',
  Q = 'q',
  PAGE = 'page',
  SORTFIELD = 'sortfield',
  CATALOGNAME = 'catalog_name',
  EVENT_TYPE = 'eventType'
}

export enum SortOrder {
  ASC,
  DSC
}

export enum CourseType {
  INTRO_COURSE = 'INTRO_COURSE',
  ADVANCED_TRAINING = 'ADVANCED_TRAINING',
  CONTINUING_EDUCATION = 'CONTINUING_EDUCATION'
}

export enum CourseProvider {
  DIGITAL_NORWAY = 'DIGITAL_NORWAY'
}

export enum PAGE_PROPERTY {
  NEWS_LIMIT = 20
}
