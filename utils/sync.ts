import { fetchUnsyncedFarmData, updateSyncStatus } from "./database";
import axios from "axios";
import { isOnline } from "./network";

const API_URL = "https://farm7.eport.dev";

// Sync unsynced farm data with the backend
export const syncFarmData = async () => {
    const online = await isOnline();
    if (!online) return;

    const unsyncedData = await fetchUnsyncedFarmData();
    for (const data of unsyncedData) {
        try {
            // Send data to the backend
            await axios.post(`${API_URL}/api/data/submit`, data);

            // Update sync status in the local database
            await updateSyncStatus(data.id, "synced");
            console.log("Synced farm data ID:", data.id);
        } catch (error) {
            console.error("Failed to sync data:", error);
        }
    }
};