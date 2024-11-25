import { AlertModal } from '@/components/shared/alert-modal';
import { Badge } from '@/components/ui/badge';
import { StudentCheckIn } from '@/constants/data';
import { useState } from 'react';

const STATUS = ['Đã điểm danh', 'Chưa điểm danh'];

interface CellActionStatusProps {
  data: StudentCheckIn;
  status: number;
}

export const CellActionStatus: React.FC<CellActionStatusProps> = ({
  data,
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
          className={`w-[130px] ${status == 1 ? `bg-green-500` : 'bg-red-400'} flex justify-center focus:bg-green-500`}
        >
          {STATUS[status - 1]}
        </Badge>
      </div>
    </>
  );
};
