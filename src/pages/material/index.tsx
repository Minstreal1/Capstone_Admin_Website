import StudentsTable from './components/students-table';
import BasePages from '@/components/shared/base-pages';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useGetMaterial } from '@/queries/admin.query';
import { DataTableSkeleton } from '@/components/shared/data-table-skeleton';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/use-toast';
import { Label } from '@/components/ui/label';
import { useState } from 'react';
import { useAddMaterial } from '@/queries/admin.query';
import { useQueryClient } from '@tanstack/react-query';

export function AddMaterialForm() {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const queryClient = useQueryClient();

  const { toast } = useToast();
  const { mutateAsync: addMaterialMutation, isPending } = useAddMaterial();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await addMaterialMutation({
        name: name,
        description: description,
        price: price
      });
      queryClient.invalidateQueries({
        queryKey: ['get-material']
      });
      toast({
        title: 'Thành công',
        description: 'Đã thêm loại rác mới',
        variant: 'destructive'
      });
      setName('');
      setDescription('');
    } catch (error) {
      toast({
        title: 'Lỗi',
        description: 'Không thể thêm loại rác. Vui lòng thử lại.',
        variant: 'destructive'
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="name">Tên loại rác</Label>
        <Input
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          placeholder="Nhập tên loại rác"
        />
      </div>
      <div>
        <Label htmlFor="description">Mô tả</Label>
        <Input
          id="description"
          value={description}
          placeholder="Nhập mô tả"
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>
      <div>
        <Label htmlFor="description">Giá</Label>
        <Input
          id="price"
          value={price}
          placeholder="Nhập giá"
          onChange={(e) => setPrice(e.target.value)}
        />
      </div>
      <Button type="submit" disabled={isPending}>
        {isPending ? 'Đang thêm...' : 'Thêm loại rác'}
      </Button>
    </form>
  );
}

export default function MaterialPage() {
  const { data: dataMaterial, isPending: penddingMaterial } = useGetMaterial();

  if (penddingMaterial) {
    return (
      <DataTableSkeleton
        columnCount={10}
        filterableColumnCount={2}
        searchableColumnCount={1}
      />
    );
  }

  return (
    <BasePages
      breadcrumbs={[
        { title: 'Trang chủ', link: '/' },
        { title: 'Loại rác', link: '/material' }
      ]}
      pageHead="Quản lý rác RCA"
      className="p-4 md:px-8"
    >
      <Tabs defaultValue="list" className="w-full">
        <TabsList>
          <TabsTrigger value="list">Danh sách loại rác</TabsTrigger>
          <TabsTrigger value="add">Thêm loại rác mới</TabsTrigger>
        </TabsList>
        <TabsContent value="list">
          {dataMaterial.length > 0 && (
            <StudentsTable
              users={dataMaterial}
              page={10}
              totalUsers={dataMaterial.length}
              pageCount={10}
            />
          )}
        </TabsContent>
        <TabsContent value="add">
          <AddMaterialForm />
        </TabsContent>
      </Tabs>
    </BasePages>
  );
}
