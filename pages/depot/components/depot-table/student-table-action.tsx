import PopupModal from '@/components/shared/popup-modal';
import StudentCreateForm from '../student-forms/student-create-form';
import TableSearchInput from '@/components/shared/table-search-input';
export default function StudentTableActions(props) {
  return (
    <div className="flex items-center justify-between gap-2 py-5">
      <div className="flex flex-1 gap-4">
        <TableSearchInput placeholder="Search People Here" />
      </div>
      <div className="flex gap-3">
        <PopupModal
          renderModal={(onClose) => <StudentCreateForm modalClose={onClose} />}
        />
      </div>
    </div>
  );
}
