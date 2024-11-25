import { AlertModal } from '@/components/shared/alert-modal';
import { Badge } from '@/components/ui/badge';
import { Employee } from '@/constants/data';
import { useState } from 'react';

const STATUS = ['Đã điểm danh', 'Chưa điểm danh'];

interface CellActionStatusProps {
  data: Employee;
  isActive: boolean;
  status: boolean;
}

export const CellActionStatus: React.FC<CellActionStatusProps> = ({
  data,
  isActive,
  status
}) => {
  const [loading] = useState(false);
  const [open, setOpen] = useState(false);

  const onConfirm = async () => {};

  return (
    <>
      <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={onConfirm}
        loading={loading}
      />

      <div className="flex gap-4">
        <Badge
          className={`w-[150px] p-2 ${status ? `bg-green-500` : 'bg-red-400'} flex justify-center`}
        >
          {STATUS[status ? 0 : 1]} {/* Sử dụng boolean để chọn chỉ mục */}
        </Badge>
      </div>
    </>
  );
};
