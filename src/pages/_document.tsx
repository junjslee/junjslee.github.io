import { Html, Head, Main, NextScript } from 'next/document'

/* Supplies the language on the html element. Without a custom document Next
   renders a bare <html>, which leaves screen readers guessing at
   pronunciation and drops a signal search engines use. */
export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
