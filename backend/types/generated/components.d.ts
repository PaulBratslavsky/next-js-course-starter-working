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

export interface LayoutFooter extends Schema.Component {
  collectionName: 'components_layout_footers';
  info: {
    displayName: 'Footer';
  };
  attributes: {
    socialLinks: Attribute.Component<'elements.social-link', true>;
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
      'layout.footer': LayoutFooter;
      'layout.top-nav': LayoutTopNav;
    }
  }
}
