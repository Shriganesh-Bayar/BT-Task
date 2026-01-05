from restaurant import Restaurant
from branch import Branch
from menu import Menu
from menu_item import MenuItem

def main():
    restaurant = Restaurant("Food Paradise")

    branch1 = Branch("Bangalore")
    menu1 = Menu("Regular Menu")
    menu1.add_item(MenuItem("Soup", "Starter", 120))
    menu1.add_item(MenuItem("Paneer Butter Masala", "Main Course", 250))
    menu1.add_item(MenuItem("Ice Cream", "Dessert", 100))
    menu1.add_item(MenuItem("Mango Juice", "Juice", 100))
    branch1.add_menu(menu1)
    restaurant.add_branch(branch1)

    branch2 = Branch("Mumbai")
    menu2 = Menu("Festival Special", True)
    menu2.add_item(MenuItem("Spring Rolls", "Starter", 150))
    menu2.add_item(MenuItem("Biryani", "Main Course", 300))
    menu2.add_item(MenuItem("Gulab Jamun", "Dessert", 120))
    menu2.add_item(MenuItem("Mango Juice", "Juice", 100))
    branch2.add_menu(menu2)
    restaurant.add_branch(branch2)

    print("Total Menu Items:", restaurant.get_total_distinct_menu_items())

    print("\nMain Course Items:")
    for item in restaurant.get_items_by_course("Main Course"):
        print(item)

    print("\nSpecial Discount Menus:")
    for menu in restaurant.get_special_menus():
        print(menu.name, "(30% OFF)")

if __name__ == "__main__":
    main()
