import { useTranslation } from "next-i18next";
import { EmployeeTeaserComponent} from "./employeeTeaser";
import { EmployeeTeaser as EmployeeTeaserType } from "@/lib/zod/employee-teaser";

interface LatestEmployeeProps {
  employees?: EmployeeTeaserType[];
}

export function Team({ employees}: LatestEmployeeProps) {
  const { t } = useTranslation();
  return (
    <div className="py-10">
      <h2 className="text-heading-sm font-bold md:text-heading-md p-5">
        Meet the Team
      </h2>
      <ul className="mt-4 grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
        {employees?.map((employee) => (
          <li key={employee.id}>
            <EmployeeTeaserComponent employee={employee} />
          </li>
        ))}
      </ul>
    </div>
  );
}