import type { NextApiRequest, NextApiResponse } from 'next';
import { Book } from '@/types/types';

//Google Books API で書籍を検索する関数
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Book[]>
) {
  let q = req.query.q || '';
  q = Array.isArray(q) ? q[0] : q;
  const data = await getData(q);
  res.status(200).json(data);
}

// Google Books API の実行と取得結果（JSON）の整形を行う関数
export async function getData(query: string): Promise<Book[]> {
  const response = await fetch(
    'https://www.googleapis.com/books/v1/volumes?q=' + encodeURIComponent(query)
  );
  const jsonData = await response.json();
  return jsonData.items.map((elem: any) => {
    return {
      id: elem.id,
      title: elem.volumeInfo.title,
      description: elem.volumeInfo?.description,
      pageCount: elem?.pageCount,
      image: elem.volumeInfo?.imageLinks?.thumbnail,
    };
  });
}
