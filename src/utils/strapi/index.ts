import {
  ComponentBasicContact, ComponentBasicFactbox,
  ComponentBasicImage,
  ComponentBasicInfobox,
  ComponentBasicParagraph,
  ComponentBasicQuote, Enum_Componentbasicfactbox_Variant,
  Provider
} from '../../services/api/generated/cms/graphql';

export function isBasicParagraph(obj?: any): obj is ComponentBasicParagraph {
  return obj && obj?.__typename === 'ComponentBasicParagraph' && obj?.content;
}

export function isBasicInfoBox(obj?: any): obj is ComponentBasicInfobox {
  return obj && obj?.__typename === 'ComponentBasicInfobox';
}

export function isBasicQuote(obj?: any): obj is ComponentBasicQuote {
  return obj && obj?.__typename === 'ComponentBasicQuote';
}

export function isBasicImage(obj?: any): obj is ComponentBasicImage {
  return obj && obj?.__typename === 'ComponentBasicImage';
}

export function isBasicContact(obj?: any): obj is ComponentBasicContact {
  return obj && obj?.__typename === 'ComponentBasicContact';
}

export function isBasicFactBox(obj?: any): obj is ComponentBasicFactbox {
  return obj && obj?.__typename === 'ComponentBasicFactbox';
}

export function isBasicFactBoxVariant(variant: Enum_Componentbasicfactbox_Variant, obj?: any): obj is ComponentBasicFactbox {
  return obj && obj?.__typename === 'ComponentBasicFactbox' && obj.variant === variant;
}

export function isProvider(obj?: any): obj is Provider {
  return obj && obj?.__typename === 'Provider' && obj.id && obj.title;
}
