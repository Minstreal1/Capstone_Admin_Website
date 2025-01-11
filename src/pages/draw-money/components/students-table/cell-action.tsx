import { AlertModal } from '@/components/shared/alert-modal';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { Edit, MoreHorizontal } from 'lucide-react';
import { useState } from 'react';
import { useDeletePost, useUpdateDrawMoney } from '@/queries/admin.query';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog';
import { useQueryClient } from '@tanstack/react-query';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
interface CellActionProps {
  data: any;
}

export function UpdateMaterialForm({ data, onUpdate }) {
  const queryClient = useQueryClient();
  const { mutateAsync: updateDrawMoney, isPending } = useUpdateDrawMoney();
  const [status, setStatus] = useState(data?.status || '');

  const handleSubmit = async (e: React.FormEvent) => {
    try {
      const model = {
        id: data.drawMoneyId,
        status: status
      };
      await updateDrawMoney(model);

      queryClient.invalidateQueries({
        queryKey: ['get-all-draw-money']
      });
      onUpdate();
    } catch (error) {}
  };

  return (
    <div className="space-y-4">
      <Select value={status} onValueChange={(value) => setStatus(value)}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Chọn trạng thái" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Chọn trạng thái</SelectLabel>
            <SelectItem value="SUCCESS">Thành công</SelectItem>
            <SelectItem value="PENDING">Chờ xử lý</SelectItem>
            <SelectItem value="CANCELED">Hủy</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
      <Button
        type="submit"
        className="w-[150px] bg-blue-500"
        disabled={isPending}
        onClick={handleSubmit}
      >
        Cập nhập
      </Button>
    </div>
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
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Cập nhập trạng thái</DialogTitle>
            <DialogDescription>
              Cập nhập trạng thái đơn rút tiền
            </DialogDescription>
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

          <DropdownMenuItem
            disabled={data.status === 'SUCCESS'}
            onClick={() => setOpenUpdate(true)}
          >
            <Edit className="mr-2 h-4 w-4" /> Cập nhập
          </DropdownMenuItem>
          {/* <DropdownMenuItem onClick={() => setOpen(true)}>
            <Trash className="mr-2 h-4 w-4" /> Xóa
          </DropdownMenuItem> */}
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};
