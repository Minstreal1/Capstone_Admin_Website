import { AlertModal } from '@/components/shared/alert-modal';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { Student } from '@/constants/data';
import { Edit, MoreHorizontal, Trash } from 'lucide-react';
import { useState } from 'react';
import { useDeletePost, useUpdatePost } from '@/queries/admin.query';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog';
import { useQueryClient } from '@tanstack/react-query';
import ReactQuill from 'react-quill';

import 'react-quill/dist/quill.snow.css';
import { useToast } from '@/components/ui/use-toast';

interface CellActionProps {
  data: Student;
}

export function UpdateMaterialForm({ data, onUpdate }) {
  const [title, setTitle] = useState(data?.title || '');
  const [content, setContent] = useState(data?.content || '');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { mutateAsync: updatePost } = useUpdatePost();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const model = {
        id: data.id,
        title,
        content
      };

      await updatePost(model);
      toast({
        title: 'Thành công',
        description: 'Sửa bài viết thành công',
        variant: 'success'
      });

      setTitle('');
      setContent('');
      queryClient.invalidateQueries({
        queryKey: ['get-all-post']
      });

      onUpdate();
    } catch (error) {
      toast({
        title: 'Lỗi',
        description: 'Sửa bài viết thất bại',
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
      <img src={data.image} alt="image" className="w-1/4" />
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
          className="mt-14 bg-green-500"
        >
          {isSubmitting ? 'Đang sửa...' : 'Sửa bài viết'}
        </Button>
      </div>
    </form>
  );
}

export const CellAction: React.FC<CellActionProps> = ({ data }) => {
  const [loading] = useState(false);
  const [open, setOpen] = useState(false);
  const [openUpdate, setOpenUpdate] = useState(false);
  const { mutateAsync: deleteMaterialMutation } = useDeletePost();
  const queryClient = useQueryClient();

  const onConfirm = async () => {
    try {
      await deleteMaterialMutation(data.id);
      queryClient.invalidateQueries({
        queryKey: ['get-all-post']
      });
      setOpen(false);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={onConfirm}
        loading={loading}
      />

      <Dialog open={openUpdate} onOpenChange={setOpenUpdate}>
        <DialogContent className="">
          <DialogHeader>
            <DialogTitle>Sửa bài đăng</DialogTitle>
            <DialogDescription>Sửa thông tin bài đăng</DialogDescription>
          </DialogHeader>
          <UpdateMaterialForm
            data={data}
            onUpdate={() => setOpenUpdate(false)}
          />
        </DialogContent>
      </Dialog>

      <DropdownMenu modal={false}>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Lựa chọn</DropdownMenuLabel>

          <DropdownMenuItem onClick={() => setOpenUpdate(true)}>
            <Edit className="mr-2 h-4 w-4" /> Cập nhập
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setOpen(true)}>
            <Trash className="mr-2 h-4 w-4" /> Xóa
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};
