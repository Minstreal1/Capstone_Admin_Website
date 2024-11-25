import * as React from 'react';
import { Check, ChevronsUpDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList
} from '@/components/ui/command';
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@/components/ui/popover';
import { useGetListSchool } from '@/queries/school.query';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { fetchSchool } from '@/redux/school.slice';
import { useGetClassBySchool } from '@/queries/class.query';
interface ComboBoxFilterProps {
  onFilter: (value) => void;
}

function FrameworkPopover({
  open,
  setOpen,
  value,
  setValue,
  placeholder,
  disabled,
  data
}) {
  console.log(data);
  return (
    <>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-[200px] justify-between"
            disabled={disabled}
          >
            {value ? data.find((fw) => fw.value === value)?.label : placeholder}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[200px] p-0">
          <Command>
            <CommandInput placeholder="Tìm kiếm..." />
            <CommandList>
              <CommandEmpty>Không tìm thấy dữ liệu</CommandEmpty>
              <CommandGroup>
                {data?.map((framework) => (
                  <CommandItem
                    key={framework.value}
                    value={framework.value}
                    onSelect={() => {
                      setValue(
                        framework.value === value ? '' : framework.value
                      );
                      setOpen(false);
                    }}
                  >
                    <Check
                      className={cn(
                        'mr-2 h-4 w-4',
                        value === framework.value ? 'opacity-100' : 'opacity-0'
                      )}
                    />
                    {framework.label}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </>
  );
}

interface typeState {
  value1: number;
  value2: number;
  open1: boolean;
  open2: boolean;
}

export default function ComboBoxFilter({ onFilter }: ComboBoxFilterProps) {
  const [state, setState] = React.useState<typeState>({
    value1: 0,
    value2: 0,
    open1: false,
    open2: false
  });
  const dispatch = useDispatch();
  const schools = useSelector((state: RootState) => state.school.listSchool);
  const [dataClass, setDataClass] = React.useState([]);
  const { data } = useGetListSchool();
  const { mutateAsync } = useGetClassBySchool();
  const dataSchool = React.useMemo(() => {
    return schools.map((school) => ({
      value: String(school.id),
      label: school.name
    }));
  }, [schools]);
  React.useLayoutEffect(() => {
    if (data) {
      dispatch(fetchSchool(data));
    }
  }, [data, dispatch]);

  React.useEffect(() => {
    if (state.value1) {
      function fetchData() {
        mutateAsync(state.value1).then((res) => {
          if (res) {
            const dataClass = res.listObjects.map((classItem: any) => ({
              value: String(classItem.id),
              label: classItem.name
            }));
            setDataClass(dataClass);
          }
        });
      }
      fetchData();
    }
    return () => {
      setDataClass([]);
    };
  }, [state.value1, mutateAsync]);

  return (
    <div className="items-end-end flex flex-col space-y-2 ">
      <div className="flex items-center space-y-1">
        <strong className="w-[150px]">Chọn trường:</strong>
        <FrameworkPopover
          open={state.open1}
          setOpen={(open: any) =>
            setState((prev) => ({ ...prev, open1: open }))
          }
          value={state.value1}
          setValue={(value: any) =>
            setState((prev) => ({ ...prev, value1: value }))
          }
          placeholder="Chọn cơ sở..."
          disabled={false}
          data={dataSchool}
        />
      </div>
      <div className="space-x- flex items-center">
        <strong className="w-[150px]"> Chọn lớp:</strong>
        <FrameworkPopover
          open={state.open2}
          setOpen={(open: any) =>
            setState((prev) => ({ ...prev, open2: open }))
          }
          value={state.value2}
          setValue={(value: any) =>
            setState((prev) => ({ ...prev, value2: value }))
          }
          placeholder="Chọn lớp..."
          disabled={!state.value1}
          data={dataClass}
        />
      </div>
      <div className="ml-[150px] flex">
        <Button
          variant="outline"
          className="w-[150px] bg-green-600 text-white"
          onClick={() => {
            onFilter({
              school: state.value1,
              class: state.value2
            });
          }}
        >
          Lọc
        </Button>
      </div>
    </div>
  );
}
