import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Employee } from '@/constants/data';

interface CellActionProps {
  data: Employee;
  isActive: boolean;
}

export const CellAction: React.FC<CellActionProps> = ({ data, isActive }) => {
  return (
    <>
      <div className="flex gap-4">
        <Input disabled={isActive} className=" w-[120px] "></Input>
        <Button disabled={isActive} className="text bg-green-500">
          Thêm
        </Button>
      </div>
    </>
  );
};
