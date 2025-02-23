//게시판 상세

import MotionButton from '@/components/MotionButton';
import PostType from '@/types/PostType';
import axios from 'axios';
import { del } from 'motion/react-client';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useParams } from 'react-router-dom';
import { API } from '@/config';
import Cookies from 'js-cookie';

function Detail({ title }: { title: string }) {
  const { id } = useParams<{ id: string }>();
  const [postDetail, setPostDetail] = useState<PostType>();

  useEffect(() => {
    if (!id) {
      console.log('Post ID is not defined');
      return;
    }

    const getPostDetail = async () => {
      try {
        const response = await axios.get(API.GETPOST +  `/${id}`);

        setPostDetail(response.data);
        console.log(response);
      } catch (err) {
        console.log(err);
      }
    };
    if (id) {
      getPostDetail();
    };
  }, [id]);

  const handleHomeClick = () => {
    window.location.href = '/';
  };

  const handleDelete = async () => {
    try {
      const deleteResponse = await axios.delete(API.DELETEPOST, {
        data: { id: id },
      });

      if (deleteResponse.data === true) {
        toast.success('삭제되었습니다.');

        // 히스토리 교체 및 페이지 리디렉션
        window.history.replaceState(null, '', '/');
        window.location.href = '/';
      } else {
        toast.error('삭제에 실패했습니다. 다시 시도해 주세요.');
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <title>{title}</title>
      <h1>게시글 상세 조회</h1>
      <div className="flex flex-row w-full h-full">
        {postDetail ? (
          <div>
            <p>${postDetail.postTitle}</p>
            <p>${postDetail.postBody}</p>
          </div>
        ) : (
          <p>게시글 데이터를 불러오지 못했습니다.</p>
        )}
        <div>
          <MotionButton onClick={handleDelete}>삭제하기</MotionButton>
          <MotionButton onClick={handleHomeClick}>돌아가기</MotionButton>
        </div>
      </div>
    </>
  );
}

export default Detail;
