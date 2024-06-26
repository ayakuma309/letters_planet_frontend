import { useState } from 'react';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import useNewBookmarkModal from '../../hooks/useNewBookmarkModal';
import { toast } from 'react-toastify';
import Modal from '../common/Modal';
import Input from '../common/Input';
import apiClient from '@/lib/apiClient';

// 入力データの検証ルールを定義
const schema = z.object({
  title: z.string(),
});

type Props = {
  time?: number;
  postId: number;
};

// 新規投稿モーダル
const NewBookmarkModal: React.FC<Props> = ({ time = 0, postId }) => {
  const newBookmarkModal = useNewBookmarkModal();
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    // 入力値の検証
    resolver: zodResolver(schema),
  });

  // 送信
  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    // console.log(data)
    setLoading(true);
    try {
      // 新規投稿
      await apiClient.post('/bookmarks/bookmark', {
        title: data.title,
        startAt: time,
        postId: postId,
      });

      toast.success('新規投稿しました!');
      newBookmarkModal.onClose();
    } catch (error) {
      toast.error('エラーが発生しました。' + error);
      return;
    } finally {
      setLoading(false);
    }
  };

  // モーダルの内容
  const getBodyContent = (): React.ReactElement => {
    return (
      <div className='flex flex-col gap-4'>
        <Input
          id='title'
          label='タイトル'
          type='title'
          disabled={loading}
          register={register}
          errors={errors}
          required
        />
      </div>
    );
  };

  return (
    <Modal
      disabled={loading}
      isOpen={newBookmarkModal.isOpen}
      title='登録する'
      primaryLabel={loading ? '登録中...' : '登録する'}
      onSubmit={handleSubmit(onSubmit)}
      onClose={newBookmarkModal.onClose}
      body={getBodyContent()}
    />
  );
};

export default NewBookmarkModal;
