import type { Schema, Attribute } from '@strapi/strapi';

export interface ElementsLink extends Schema.Component {
  collectionName: 'components_elements_links';
  info: {
    displayName: 'Link';
  };
  attributes: {
    text: Attribute.String;
    href: Attribute.String;
  };
}

export interface ElementsSocialLink extends Schema.Component {
  collectionName: 'components_elements_social_links';
  info: {
    displayName: 'SocialLink';
    description: '';
  };
  attributes: {
    text: Attribute.String;
    href: Attribute.String;
    icon: Attribute.Enumeration<['FACEBOOK', 'TWITTER', 'YOUTUBE']>;
  };
}

export interface LayoutFeature extends Schema.Component {
  collectionName: 'components_layout_features';
  info: {
    displayName: 'Feature';
  };
  attributes: {
    name: Attribute.String;
    description: Attribute.Text;
  };
}

export interface LayoutFeaturesList extends Schema.Component {
  collectionName: 'components_layout_features_lists';
  info: {
    displayName: 'Features List';
  };
  attributes: {
    feature: Attribute.Component<'layout.feature', true>;
  };
}

export interface LayoutFooter extends Schema.Component {
  collectionName: 'components_layout_footers';
  info: {
    displayName: 'Footer';
  };
  attributes: {
    socialLinks: Attribute.Component<'elements.social-link', true>;
  };
}

export interface LayoutHero extends Schema.Component {
  collectionName: 'components_layout_heroes';
  info: {
    displayName: 'Hero';
  };
  attributes: {
    heading: Attribute.String;
    text: Attribute.Text;
    image: Attribute.Media;
    link: Attribute.Component<'elements.link'>;
  };
}

export interface LayoutTopNav extends Schema.Component {
  collectionName: 'components_layout_top_navs';
  info: {
    displayName: 'TopNav';
    description: '';
  };
  attributes: {
    logoText: Attribute.Component<'elements.link'>;
    navItems: Attribute.Component<'elements.link', true>;
    cta: Attribute.Component<'elements.link'>;
  };
}

declare module '@strapi/types' {
  export module Shared {
    export interface Components {
      'elements.link': ElementsLink;
      'elements.social-link': ElementsSocialLink;
      'layout.feature': LayoutFeature;
      'layout.features-list': LayoutFeaturesList;
      'layout.footer': LayoutFooter;
      'layout.hero': LayoutHero;
      'layout.top-nav': LayoutTopNav;
    }
  }
}
