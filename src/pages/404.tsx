import Head from 'next/head'
import Link from 'next/link'
import type { NextPage } from 'next'
import { SITE_NAME } from '../lib/site'

const NotFound: NextPage = () => (
  <>
    <Head>
      <title>{`Page not found — ${SITE_NAME}`}</title>
      <meta name="robots" content="noindex,follow" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
    </Head>
    <main className="xp-error-page">
      <div className="window xp-error-dialog">
        <div className="title-bar">
          <div className="title-bar-text">Windows — Address Not Found</div>
        </div>
        <div className="window-body xp-error-body">
          <div className="xp-error-row">
            <span className="xp-error-mark" aria-hidden="true">
              ✕
            </span>
            <div className="xp-error-copy">
              <p>
                <strong>The page you asked for is not on this computer.</strong>
              </p>
              <p>
                It may have been moved, renamed, or never existed. Nothing is broken — you just
                took a turn that leads nowhere.
              </p>
            </div>
          </div>
          <div className="xp-error-actions">
            <Link href="/">Back to the desktop</Link>
            <Link href="/research/">Research</Link>
            <Link href="/projects/">Projects</Link>
          </div>
        </div>
      </div>
    </main>
  </>
)

export default NotFound
