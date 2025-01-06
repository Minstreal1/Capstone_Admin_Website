import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { useCreatePost } from '@/queries/admin.query';
import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

export function AddPostPage() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { mutateAsync: createPost } = useCreatePost();
  const { toast } = useToast();
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const model = {
        title: title,
        content: content
      };
      await createPost(model);
      toast({
        title: 'Thành công',
        description: 'Đăng bài viết thành công',
        variant: 'success'
      });
      setTitle('');
      setContent('');
    } catch (error) {
      toast({
        title: 'Lỗi',
        description: 'Đăng bài viết thất bại',
        variant: 'destructive'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6"
      style={{ maxWidth: '1200px', margin: '0 auto' }}
    >
      <div>
        <label
          htmlFor="title"
          style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold' }}
        >
          Tiêu đề bài viết
        </label>
        <input
          id="title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          placeholder="Nhập tiêu đề bài viết"
          style={{
            width: '100%',
            padding: '8px',
            fontSize: '16px',
            border: '1px solid #ccc',
            borderRadius: '4px'
          }}
        />
      </div>
      <div className="mb-[10%]">
        <label
          htmlFor="content"
          style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold' }}
        >
          Nội dung bài viết
        </label>
        <ReactQuill
          theme="snow"
          value={content}
          onChange={setContent}
          placeholder="Nhập nội dung bài viết..."
          style={{ height: '200px' }}
          className="w-full"
        />
      </div>
      <div>
        <Button
          type="submit"
          disabled={isSubmitting}
          style={{
            cursor: isSubmitting ? 'not-allowed' : 'pointer'
          }}
          className="mt-14"
        >
          {isSubmitting ? 'Đang đăng...' : 'Đăng bài viết'}
        </Button>
      </div>
    </form>
  );
}
