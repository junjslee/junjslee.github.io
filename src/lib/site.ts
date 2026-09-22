export const SITE_URL = 'https://junjslee.github.io'
export const SITE_NAME = 'Junseong Lee'
export const SITE_DESCRIPTION =
  'Personal site of Junseong Lee — AI researcher working on medical AI, human-AI interaction, and biomedical knowledge graphs.'
/** Landscape card for link previews. A portrait crops badly at 1.91:1. */
export const SITE_IMAGE = `${SITE_URL}/images/og-card.jpg`
export const SITE_PORTRAIT = `${SITE_URL}/images/hero.jpg`

export const SITE_SAME_AS = [
  'https://github.com/junjslee',
  'https://www.linkedin.com/in/junseong-lee',
]

/** Reused by every page so breadcrumbs stay consistent. */
export function breadcrumbJsonLd(trail: Array<{ name: string; path: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: trail.map((step, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: step.name,
      item: `${SITE_URL}${step.path}`,
    })),
  }
}
