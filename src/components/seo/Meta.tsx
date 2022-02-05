import Head from 'next/head'
import { useRouter } from 'next/router'
import React from 'react'

const Meta = ({
  //
  title,
  description,
  keywords,
  banner,
}: {
  title?: string
  description?: string
  keywords?: string
  banner?: string
}) => {
  const hasWindow = typeof window !== 'undefined'

  const hostName = hasWindow
    ? window?.location?.hostname
    : process.env.NEXT_PUBLIC_HOST_DOMAIN
  const windowOrigin =
    (hasWindow && hostName !== 'localhost' && window?.location?.origin) ||
    process.env.NEXT_PUBLIC_HOST_URL
  const host =
    (hasWindow && hostName !== 'localhost' && window?.location?.host) ||
    process.env.NEXT_PUBLIC_HOST_DOMAIN
  const { asPath } = useRouter()
  const href = windowOrigin + (asPath || '')
  const defaultTitle = 'Pokédex | Pokédex'
  const defaultDescription = 'Online Pokédex'
  const keywordList = ['Pokemon', 'Pokédex']
  const defaultKeywords = keywordList.join(', ')
  const defaultBanner = ''
  return (
    <Head>
      {/* <!-- default --> */}
      <meta
        name="viewport"
        content="width=device-width,initial-scale=1,maximum-scale=100"
      />
      <link rel="canonical" href={href} />

      <title>{title || defaultTitle}</title>
      <meta name="description" content={description || defaultDescription} />
      <meta name="keywords" content={keywords || defaultKeywords} />

      {/* <!-- Facebook Meta tags --/> */}
      <meta property="og:url" content={href} />
      <meta property="og:type" content="website" />
      <meta property="og:title" content={title || defaultTitle} />
      <meta
        property="og:description"
        content={description || defaultDescription}
      />
      <meta property="og:image" content={banner || defaultBanner} />

      {/* <!-- Twitter Meta Tags --/> */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta property="twitter:domain" content={host} />
      <meta property="twitter:url" content={href} />
      <meta name="twitter:title" content={title || defaultTitle} />
      <meta
        name="twitter:description"
        content={description || defaultDescription}
      />
      <meta name="twitter:image" content={banner || defaultBanner} />
    </Head>
  )
}

export default Meta
