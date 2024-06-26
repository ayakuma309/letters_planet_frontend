import React from 'react';
import Head from 'next/head';
import { DefaultSeo } from 'next-seo';

const SeoSetting = () => {
  return (
    <div>
      <Head>
        <meta
          name='viewport'
          content='minimum-scale=1, initial-scale=1, width=device-width'
        />
      </Head>
      <DefaultSeo
        defaultTitle='letters tube'
        description='どれから見たら良いかわからないを解決するサービスです'
        openGraph={{
          type: 'website',
          title: 'letters tube',
          description: 'どれから見たら良いかわからないを解決するサービスです',
          site_name: 'letters tube',
          url: 'https://letters-tube.vercel.app/',
          images: [
            {
              url: 'https://letters-tube.vercel.app/ogp.png',
              width: 800,
              height: 600,
              alt: 'Og Image Alt',
              type: 'image/jpeg',
            },
          ],
        }}
        twitter={{
          handle: '@letters_tube',
          site: '@letters_tube',
          cardType: 'summary_large_image',
        }}
      />
    </div>
  );
};

export default SeoSetting;
