class RoleBuilder:
    """
    Private data member
    """
    ROLES = ["UNDEFINED", "DEVELOPER", "TEST_ENGINEER", "SR_DEVELOPER", "DESIGNER"]

    """
    Method to get role description for a given role id
    """
    @staticmethod
    def get_role_description(role_id):
        try:
            role_id = int(role_id)
            if 1 <= role_id <= 4:
                return RoleBuilder.ROLES[role_id]
        except:
            pass    
        return "UNDEFINED"
