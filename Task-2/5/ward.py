class Ward:
    def __init__(self, ward_name):
        self.ward_name = ward_name
        self.patients = []

    def admit_patient(self, patient):
        self.patients.append(patient)

    def get_patients(self):
        return self.patients
