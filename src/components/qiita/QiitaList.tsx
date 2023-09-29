import React from 'react';
import { QiitaItemsProps } from '@/types/qiitaTypes';
import QiitaItem from '@/components/qiita/QiitaItem';

function QiitaList({ data, error }: { data: QiitaItemsProps[] | null, error: any }) {
  return (
    <div>
      {error && <div>データの読み込み中にエラーが発生しました。</div>}
      {data && (
        <div>
          <ul>
            {data.map((item: QiitaItemsProps) => (
              <QiitaItem key={item.id} item={item} />
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default QiitaList;
