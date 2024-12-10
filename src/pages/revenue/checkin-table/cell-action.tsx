import { AlertModal } from '@/components/shared/alert-modal';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Employee } from '@/constants/data';
import { useState } from 'react';

interface CellActionProps {
  data: Employee;
  isActive: boolean;
}

export const CellAction: React.FC<CellActionProps> = ({ data, isActive }) => {
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
        <Input disabled={isActive} className=" w-[120px] "></Input>
        <Button disabled={isActive} className="text bg-green-500">
          Thêm
        </Button>
      </div>
    </>
  );
};
