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
import { useDeleteMaterial } from '@/queries/admin.query';
import { useUpdateMaterial } from '@/queries/admin.query';
import { Input } from '@/components/ui/input';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { useQueryClient } from '@tanstack/react-query';

interface CellActionProps {
  data: Student;
}

export function UpdateMaterialForm({ data, onUpdate }) {
  const [name, setName] = useState(data.name);
  const [description, setDescription] = useState(data.description);
  const [price, setPrice] = useState(data.price);
  const queryClient = useQueryClient();
  const { mutateAsync: updateMaterialMutation, isPending } =
    useUpdateMaterial();

  // useEffect(() => {
  //   if (material) {
  //     setName(material.name);
  //     setDescription(material.description);
  //   }
  // }, [material]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await updateMaterialMutation({
        id: data.id,
        name: name,
        description: description,
        price: price
      });
      queryClient.invalidateQueries({
        queryKey: ['get-material']
      });
      onUpdate();
    } catch (error) {}
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="name">Tên loại rác</Label>
        <Input
          id="name"
          value={name}
          placeholder="Nhập tên loại rác"
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>
      <div>
        <Label htmlFor="description">Mô tả</Label>
        <Input
          id="description"
          placeholder="Nhập mô tả"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>
      <div>
        <Label htmlFor="price">Giá</Label>
        <Input
          id="price"
          placeholder="Nhập giá"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
      </div>
      <Button type="submit" disabled={isPending}>
        {isPending ? 'Đang cập nhật...' : 'Cập nhật loại rác'}
      </Button>
    </form>
  );
}

export const CellAction: React.FC<CellActionProps> = ({ data }) => {
  const [loading] = useState(false);
  const [open, setOpen] = useState(false);
  const [openUpdate, setOpenUpdate] = useState(false);
  const { mutateAsync: deleteMaterialMutation } = useDeleteMaterial();
  const queryClient = useQueryClient();

  const onConfirm = async () => {
    try {
      await deleteMaterialMutation(data.id);
      queryClient.invalidateQueries({
        queryKey: ['get-material']
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
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Sửa loại rác</DialogTitle>
            <DialogDescription>Sửa thông tin loại rác</DialogDescription>
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
