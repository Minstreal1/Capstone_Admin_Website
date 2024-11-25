import Salary from './salary';
import Student from './student';
export function AnalyticsTab() {
  return (
    <div className="grid space-y-4">
      <Salary />
      <Student />
    </div>
  );
}
