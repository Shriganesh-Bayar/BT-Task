class Restaurant:
    def __init__(self, name):
        self.name = name
        self.branches = []

    def add_branch(self, branch):
        self.branches.append(branch)

    def get_total_distinct_menu_items(self):
        unique_items = set()

        for branch in self.branches:
            for menu in branch.menus:
                for item in menu.items:
                    unique_items.add(item.name)

        return len(unique_items)
    
    def get_items_by_course(self, course):
        return [
            item
            for branch in self.branches
            for menu in branch.menus
            for item in menu.items
            if item.course_category == course
        ]
    
    def get_special_menus(self):
        return [
            menu
            for branch in self.branches
            for menu in branch.menus
            if menu.special
        ]