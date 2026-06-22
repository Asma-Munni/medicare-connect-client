import { serverFetch } from "../core/server";

export const getPrescriptionById = async (id) => {
  return await serverFetch(`/prescriptions/${id}`);
};