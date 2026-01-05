from employee import Employee
from address import Address

class Program:
    @staticmethod
    def main(args):
        emp = Employee()
        Program.store_data(emp)
        Program.show_data(emp)

    @staticmethod
    def store_data(emp):
        name = input("Enter the employee name: ")
        Id = input("Enter employee id: ")
        gender = input("Enter male or female: ")

        address1 = input("Enter employee address1: ")
        address2 = input("Enter employee address2: ")
        city = input("Enter employee city: ")
        pincode = int(input("Enter employees pincode: "))

        # creates an address object ot pass to employee
        address = Address(address1, city, pincode, address2)

        emp.name = name
        emp.Id = Id
        emp.gender = gender
        emp.address = address


    @staticmethod
    def show_data(emp):
        print("\n\nDisplay the employee information----------------")
        print("Employee Name :", emp.name)
        print("Employee Id :", emp.Id) 
        print("Employee Gender :", emp.gender)

        print("\nEmployee Address : --------------")
        print("Address 1 :", emp.address.address1)
        print("Address 2 :", emp.address.address2)
        print("City :", emp.address.city)
        print("PinCode :", emp.address.pincode)
        print("----------------------------------")


if __name__ == "__main__":
    Program.main([])
