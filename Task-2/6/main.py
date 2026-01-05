from marine_company import MarineCompany
from cruise_ship import CruiseShip
from cargo_ship import CargoShip
from customer import Customer
from booking import Booking

def main():
    company = MarineCompany("Oceanic Marine")

    # Ships
    cruise1 = CruiseShip(1, "Ocean Queen", "Mumbai - Goa")
    cargo1 = CargoShip(2, "Cargo Titan")

    company.add_ship(cruise1)
    company.add_ship(cargo1)

    # Customers
    c1 = Customer(101, "Rahul")
    c2 = Customer(102, "Anita")
    c3 = Customer(103, "Suresh")

    # Bookings
    cruise1.add_booking(Booking(c1, 5000))
    cruise1.add_booking(Booking(c2, 6000))
    cargo1.add_booking(Booking(c3, 12000))

    # ---------------- OUTPUTS ----------------

    print("Total amount collected:")
    print(company.get_total_amount_collected())

    print("\nTotal amount per ship:")
    for ship, amount in company.get_amount_per_ship().items():
        print(ship, ":", amount)

    print("\nCustomers for cruise ship:", cruise1.name)
    for customer in company.get_customers_for_cruise_ship(cruise1):
        print(customer)

if __name__ == "__main__":
    main()
