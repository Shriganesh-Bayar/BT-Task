class Surgeon:
    def __init__(self, surgeon_id, name, surgeon_type):
        self.surgeon_id = surgeon_id
        self.name = name
        self.surgeon_type = surgeon_type
        self.hospitals = []
        self.operated_patients = []

    def assign_hospital(self, hospital):
        self.hospitals.append(hospital)

    def operate_patient(self, patient):
        self.operated_patients.append(patient)

    def get_total_patients_operated(self):
        return len(self.operated_patients)

    def get_operated_patients(self):
        return self.operated_patients
