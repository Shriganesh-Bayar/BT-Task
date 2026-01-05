from employee_report import EmployeeReport
from role_builder import RoleBuilder
from roles import Roles
from employee import Employee

class Program:
    @staticmethod
    def main(args):
        employees = [] 

        print("Enter employee information")

        for i in range(4):
            employee = Employee()

            print("Employee No :", i + 1)
            employee.emp_id = input("Id : ")
            employee.name = input("Name : ")
            employee.basic = float(input("Basic : "))
            employee.hra = float(input("HRA : "))
            employee.allowance_percentage = float(input("Percentage of Allowance : "))

            print("Enter Role Id : ")
            print("1. DEVELOPER")
            print("2. TEST_ENGINEER")
            print("3. SR_DEVELOPER")
            print("4. DESIGNER")
            employee.role = int(input())

            employees.append(employee) 

        report_date = input("Enter the date of the report (dd/mm/yyyy) : ")

        report = EmployeeReport(report_date)
        report.display_employees(employees)

if __name__ == "__main__":
    import sys
    Program.main(sys.argv[1:])
