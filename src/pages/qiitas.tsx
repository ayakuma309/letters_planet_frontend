import QiitaArticle from '@/components/qiita/QiitaArticle';
import apiClient from '@/lib/apiClient';
import { QiitaArticleProps } from '@/types/qiitaTypes';
import React from 'react';
import useSWR from 'swr';

const fetcher = async (url: string): Promise<any> => {
  const res = await apiClient.get(url);
  return res.data;
};

const qiitas = () => {
  const { data: get_qiita_articles, error } = useSWR(
    '/qiitas/get_qiita_articles',
    fetcher
  );
  return (
    <div
      className={`flex min-h-screen flex-col items-center justify-between p-24`}
    >
      {error && <div>データの読み込み中にエラーが発生しました。</div>}
      {get_qiita_articles && (
        <div>
          {get_qiita_articles.map((item: QiitaArticleProps) => (
            <QiitaArticle
              key={item.id}
              id={item.id}
              title={item.title}
              url={item.url}
              tags={item.tags}
              profileImageUrl={item.profileImageUrl}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default qiitas;
