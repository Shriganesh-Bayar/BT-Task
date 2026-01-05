from patient import Patient
from ward import Ward
from hospital import Hospital
from surgeon import Surgeon

if __name__ == "__main__":
    # Create hospitals
    h1 = Hospital("City Hospital")

    # Create wards
    ward1 = Ward("ICU")
    ward2 = Ward("General")

    h1.add_ward(ward1)
    h1.add_ward(ward2)

    # Create patients
    p1 = Patient(1, "Rahul")
    p2 = Patient(2, "Anita")
    p3 = Patient(3, "Suresh")

    # Admit patients to wards
    ward1.admit_patient(p1)
    ward1.admit_patient(p2)
    ward2.admit_patient(p3)

    # Create surgeon
    surgeon = Surgeon(101, "Dr. Mehta", "Senior")

    surgeon.assign_hospital(h1)

    # Surgeon operates patients
    surgeon.operate_patient(p1)
    surgeon.operate_patient(p3)

    # ---------------- OUTPUTS ----------------

    print("Total number of patients operated:")
    print(surgeon.get_total_patients_operated())

    print("\nPatients operated by surgeon:")
    for patient in surgeon.get_operated_patients():
        print(patient)

    print("\nPatients admitted to ICU ward:")
    for patient in ward1.get_patients():
        print(patient)
