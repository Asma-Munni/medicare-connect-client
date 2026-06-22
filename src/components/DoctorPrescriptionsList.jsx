"use client";

import { useEffect, useState } from "react";
import { authClient } from "@/lib/auth-client";
import { createPrescription } from "@/lib/actions/prescription";
import { FileText, Plus, Trash2, CheckCircle } from "lucide-react";
import toast from "react-hot-toast";

const emptyMedicine = {
  name: "",
  dosage: "",
  frequency: "",
  duration: "",
  instruction: "",
};

export default function DoctorPrescriptionsList() {
  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;

  const [doctor, setDoctor] = useState(null);
  const [appointments, setAppointments] = useState([]);
  const [prescriptions, setPrescriptions] = useState([]);
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState("");
  const [error, setError] = useState("");

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

  useEffect(() => {
    const loadDoctorData = async () => {
      if (isPending) return;

      if (!user?.email) {
        setLoading(false);
        setError("Please login as a doctor.");
        return;
      }

      try {
        setLoading(true);

        const doctorRes = await fetch(
          `${baseUrl}/doctors/email/${encodeURIComponent(user.email)}`,
          { cache: "no-store" }
        );

        const doctorData = await doctorRes.json();

        if (!doctorData?.success) {
          setError("Doctor profile not found for this account.");
          return;
        }

        const doctorProfile = doctorData.data;
        setDoctor(doctorProfile);

        const appointmentRes = await fetch(
          `${baseUrl}/appointments/doctor/${doctorProfile._id}`,
          { cache: "no-store" }
        );

        const appointmentData = await appointmentRes.json();

        const prescriptionRes = await fetch(
          `${baseUrl}/prescriptions/doctor/${doctorProfile._id}`,
          { cache: "no-store" }
        );

        const prescriptionData = await prescriptionRes.json();

        if (!appointmentData?.success) {
          setError(appointmentData?.message || "Failed to load appointments.");
          return;
        }

        if (!prescriptionData?.success) {
          setError(
            prescriptionData?.message || "Failed to load prescriptions."
          );
          return;
        }

        setAppointments(appointmentData?.data || []);
        setPrescriptions(prescriptionData?.data || []);
      } catch (error) {
        setError("Something went wrong while loading prescriptions.");
      } finally {
        setLoading(false);
      }
    };

    loadDoctorData();
  }, [isPending, user, baseUrl]);

  const handleFieldChange = (appointmentId, field, value) => {
    setFormData((prev) => ({
      ...prev,
      [appointmentId]: {
        ...prev[appointmentId],
        [field]: value,
      },
    }));
  };

  const handleMedicineChange = (appointmentId, index, field, value) => {
    setFormData((prev) => {
      const currentForm = prev[appointmentId] || {};
      const medicines = currentForm.medicines?.length
        ? [...currentForm.medicines]
        : [{ ...emptyMedicine }];

      medicines[index] = {
        ...medicines[index],
        [field]: value,
      };

      return {
        ...prev,
        [appointmentId]: {
          ...currentForm,
          medicines,
        },
      };
    });
  };

  const handleAddMedicine = (appointmentId) => {
    setFormData((prev) => {
      const currentForm = prev[appointmentId] || {};
      const medicines = currentForm.medicines?.length
        ? [...currentForm.medicines]
        : [{ ...emptyMedicine }];

      return {
        ...prev,
        [appointmentId]: {
          ...currentForm,
          medicines: [...medicines, { ...emptyMedicine }],
        },
      };
    });
  };

  const handleRemoveMedicine = (appointmentId, index) => {
    setFormData((prev) => {
      const currentForm = prev[appointmentId] || {};
      const medicines = currentForm.medicines?.length
        ? [...currentForm.medicines]
        : [{ ...emptyMedicine }];

      const updatedMedicines = medicines.filter((_, itemIndex) => {
        return itemIndex !== index;
      });

      return {
        ...prev,
        [appointmentId]: {
          ...currentForm,
          medicines: updatedMedicines.length
            ? updatedMedicines
            : [{ ...emptyMedicine }],
        },
      };
    });
  };

  const handleCreatePrescription = async (appointment) => {
    const currentForm = formData[appointment._id] || {};
    const medicines = currentForm.medicines?.length
      ? currentForm.medicines
      : [{ ...emptyMedicine }];

    const validMedicines = medicines.filter(
      (medicine) =>
        medicine.name &&
        medicine.dosage &&
        medicine.frequency &&
        medicine.duration
    );

    if (!currentForm.diagnosis || validMedicines.length === 0) {
     toast.error("Please add diagnosis and at least one complete medicine.");
      return;
    }

    try {
      setActionLoading(appointment._id);

      const result = await createPrescription({
        appointmentId: appointment._id,
        doctorId: doctor._id,
        diagnosis: currentForm.diagnosis,
        medicines: validMedicines,
        advice: currentForm.advice || "",
        followUpDate: currentForm.followUpDate || "",
      });

      if (!result?.success) {
        toast.error(result?.message || "Failed to create prescription.");
        return;
      }

      toast.success("Prescription created successfully.");

      setPrescriptions((prev) => [result.data, ...prev]);

      setAppointments((prev) =>
        prev.map((item) =>
          item._id === appointment._id
            ? {
                ...item,
                prescriptionStatus: "created",
                prescriptionId: result.data._id,
              }
            : item
        )
      );

      setFormData((prev) => ({
        ...prev,
        [appointment._id]: {
          diagnosis: "",
          medicines: [{ ...emptyMedicine }],
          advice: "",
          followUpDate: "",
        },
      }));
    } catch (error) {
     toast.error("Something went wrong. Please try again.");
    } finally {
      setActionLoading("");
    }
  };

  if (isPending || loading) {
    return (
      <div className="mt-6 rounded-3xl bg-white border border-blue-100 p-6 text-center">
        <p className="text-slate-500">Loading prescriptions...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="mt-6 rounded-3xl bg-white border border-red-100 p-6 text-center">
        <h2 className="text-xl font-bold text-slate-900">Unable to load</h2>
        <p className="mt-2 text-sm text-red-500">{error}</p>
      </div>
    );
  }

  const completedAppointments = appointments.filter(
    (appointment) => appointment.appointmentStatus === "completed"
  );

  const prescribedAppointmentIds = prescriptions.map(
    (prescription) => prescription.appointmentId
  );

  const prescriptionableAppointments = completedAppointments.filter(
    (appointment) => !prescribedAppointmentIds.includes(appointment._id)
  );

  return (
    <div className="mt-6 space-y-6">
      <div className="rounded-3xl bg-white border border-blue-100 shadow-sm p-6">
        <div className="flex items-center gap-3">
          <div className="h-12 w-12 rounded-2xl bg-blue-50 text-blue-700 flex items-center justify-center">
            <FileText size={24} />
          </div>

          <div>
            <h2 className="text-xl font-bold text-slate-900">
              Create Prescription
            </h2>
            <p className="mt-1 text-sm text-slate-500">
              You can create prescriptions only for completed appointments.
            </p>
          </div>
        </div>

        {prescriptionableAppointments.length === 0 ? (
          <div className="mt-6 rounded-2xl bg-slate-50 p-5 text-center">
            <p className="text-sm text-slate-500">
              No completed appointment is available for prescription right now.
            </p>
          </div>
        ) : (
          <div className="mt-6 space-y-6">
            {prescriptionableAppointments.map((appointment) => {
              const currentForm = formData[appointment._id] || {};
              const medicines = currentForm.medicines?.length
                ? currentForm.medicines
                : [{ ...emptyMedicine }];

              return (
                <div
                  key={appointment._id}
                  className="rounded-2xl border border-slate-100 p-5"
                >
                  <div className="flex flex-col lg:flex-row lg:items-start gap-5">
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-slate-900">
                        {appointment.patientName}
                      </h3>

                      <p className="mt-1 text-sm text-slate-500">
                        Email: {appointment.patientEmail}
                      </p>

                      <p className="mt-1 text-sm text-slate-500">
                        Date: {appointment.appointmentDate} at{" "}
                        {appointment.appointmentTime}
                      </p>

                      <p className="mt-1 text-sm text-slate-500">
                        Symptoms: {appointment.symptoms || "Not provided"}
                      </p>

                      <span className="mt-3 inline-flex rounded-full bg-green-50 px-3 py-1 text-xs font-semibold text-green-700">
                        Completed
                      </span>
                    </div>

                    <div className="w-full lg:w-[520px] space-y-3">
                      <input
                        type="text"
                        value={currentForm.diagnosis || ""}
                        onChange={(event) =>
                          handleFieldChange(
                            appointment._id,
                            "diagnosis",
                            event.target.value
                          )
                        }
                        placeholder="Diagnosis"
                        className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-blue-400"
                      />

                      <div className="space-y-3">
                        {medicines.map((medicine, index) => (
                          <div
                            key={index}
                            className="rounded-xl border border-slate-100 p-3 space-y-2"
                          >
                            <div className="flex items-center justify-between">
                              <p className="text-sm font-bold text-slate-900">
                                Medicine {index + 1}
                              </p>

                              <button
                                type="button"
                                onClick={() =>
                                  handleRemoveMedicine(appointment._id, index)
                                }
                                className="text-red-500 hover:text-red-600"
                              >
                                <Trash2 size={16} />
                              </button>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                              <input
                                type="text"
                                value={medicine.name || ""}
                                onChange={(event) =>
                                  handleMedicineChange(
                                    appointment._id,
                                    index,
                                    "name",
                                    event.target.value
                                  )
                                }
                                placeholder="Medicine name"
                                className="rounded-xl border border-slate-200 px-3 py-2 text-sm outline-none focus:border-blue-400"
                              />

                              <input
                                type="text"
                                value={medicine.dosage || ""}
                                onChange={(event) =>
                                  handleMedicineChange(
                                    appointment._id,
                                    index,
                                    "dosage",
                                    event.target.value
                                  )
                                }
                                placeholder="Dosage, e.g. 500mg"
                                className="rounded-xl border border-slate-200 px-3 py-2 text-sm outline-none focus:border-blue-400"
                              />

                              <input
                                type="text"
                                value={medicine.frequency || ""}
                                onChange={(event) =>
                                  handleMedicineChange(
                                    appointment._id,
                                    index,
                                    "frequency",
                                    event.target.value
                                  )
                                }
                                placeholder="Frequency"
                                className="rounded-xl border border-slate-200 px-3 py-2 text-sm outline-none focus:border-blue-400"
                              />

                              <input
                                type="text"
                                value={medicine.duration || ""}
                                onChange={(event) =>
                                  handleMedicineChange(
                                    appointment._id,
                                    index,
                                    "duration",
                                    event.target.value
                                  )
                                }
                                placeholder="Duration"
                                className="rounded-xl border border-slate-200 px-3 py-2 text-sm outline-none focus:border-blue-400"
                              />
                            </div>

                            <input
                              type="text"
                              value={medicine.instruction || ""}
                              onChange={(event) =>
                                handleMedicineChange(
                                  appointment._id,
                                  index,
                                  "instruction",
                                  event.target.value
                                )
                              }
                              placeholder="Instruction, e.g. after meal"
                              className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm outline-none focus:border-blue-400"
                            />
                          </div>
                        ))}
                      </div>

                      <button
                        type="button"
                        onClick={() => handleAddMedicine(appointment._id)}
                        className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-200"
                      >
                        <Plus size={15} />
                        Add Medicine
                      </button>

                      <textarea
                        value={currentForm.advice || ""}
                        onChange={(event) =>
                          handleFieldChange(
                            appointment._id,
                            "advice",
                            event.target.value
                          )
                        }
                        rows={3}
                        placeholder="Advice"
                        className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-blue-400"
                      />

                      <input
                        type="date"
                        value={currentForm.followUpDate || ""}
                        onChange={(event) =>
                          handleFieldChange(
                            appointment._id,
                            "followUpDate",
                            event.target.value
                          )
                        }
                        className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-blue-400"
                      />

                      <button
                        onClick={() => handleCreatePrescription(appointment)}
                        disabled={actionLoading === appointment._id}
                        className="w-full rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white hover:bg-blue-700 disabled:opacity-50"
                      >
                        {actionLoading === appointment._id
                          ? "Creating..."
                          : "Create Prescription"}
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      <div className="rounded-3xl bg-white border border-blue-100 shadow-sm p-6">
        <div className="flex items-center gap-3">
          <div className="h-12 w-12 rounded-2xl bg-green-50 text-green-700 flex items-center justify-center">
            <CheckCircle size={24} />
          </div>

          <div>
            <h2 className="text-xl font-bold text-slate-900">
              Created Prescriptions
            </h2>
            <p className="mt-1 text-sm text-slate-500">
              Total prescriptions: {prescriptions.length}
            </p>
          </div>
        </div>

        {prescriptions.length === 0 ? (
          <div className="mt-6 rounded-2xl bg-slate-50 p-5 text-center">
            <p className="text-sm text-slate-500">
              You have not created any prescription yet.
            </p>
          </div>
        ) : (
          <div className="mt-6 space-y-4">
            {prescriptions.map((prescription) => (
              <div
                key={prescription._id}
                className="rounded-2xl border border-slate-100 p-5"
              >
                <h3 className="font-bold text-slate-900">
                  Patient: {prescription.patientName}
                </h3>

                <p className="mt-1 text-sm text-slate-500">
                  Diagnosis: {prescription.diagnosis}
                </p>

                <p className="mt-1 text-sm text-slate-500">
                  Medicines: {prescription.medicines?.length || 0}
                </p>

                <p className="mt-1 text-sm text-slate-500">
                  Follow-up: {prescription.followUpDate || "Not required"}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}