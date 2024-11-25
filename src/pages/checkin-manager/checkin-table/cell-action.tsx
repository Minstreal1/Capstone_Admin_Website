import { Button } from '@/components/ui/button';
import { Student } from '@/constants/data';
import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog';
interface CellActionProps {
  data: Student;
  isActive: boolean;
}

export const CellAction: React.FC<CellActionProps> = ({ data, isActive }) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="flex gap-4">
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button
              variant="outline"
              className="bg-green-500 text-white hover:bg-green-600 hover:text-white"
            >
              Xem chi tiết
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Chi tiết điểm danh</DialogTitle>
              <DialogDescription>
                Xem các ngày nghỉ của học sinh theo thời gian
              </DialogDescription>
            </DialogHeader>
            <p className="flex text-right">
              Tên học sinh: <span>{data.name}</span>
            </p>
            <p className="flex text-right">Danh sách ngày nghỉ</p>
            <ul>
              <li>Ngày 1: 1/1/2021</li>
              <li>Ngày 2: 2/1/2021</li>
              <li>Ngày 3: 3/1/2021</li>
            </ul>
            <DialogFooter>
              <Button
                type="submit"
                className="bg-green-500 text-white hover:bg-green-600"
                onClick={() => setOpen(false)}
              >
                Xong
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </>
  );
};
