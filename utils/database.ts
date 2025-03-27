import { openDatabaseSync } from "expo-sqlite";
import * as FileSystem from "expo-file-system";

const dbName = "myfarmappdb.db";
const db = openDatabaseSync("myfarmappdb.db");

const dbVersion = 3;

type UserVersionResult = {
    user_version: number;
};

// Check if the database version matches the current version
const checkDatabaseVersion = async (): Promise<boolean> => {
    try {
        const result = await db.getFirstAsync<UserVersionResult>("PRAGMA user_version;");
        return result?.user_version === dbVersion;
    } catch (error) {
        console.error("Error checking database version:", error);
        return false;
    }
};

// Delete the existing database file
export const deleteDatabase = async () => {
    const dbPath = `${FileSystem.documentDirectory}SQLite/myfarmappdb.db`;
    try {
        await FileSystem.deleteAsync(dbPath);
        console.log("Database deleted successfully");
    } catch (error) {
        console.error("Error deleting database:", error);
    }
};
// Update the database version
const updateDatabaseVersion = async () => {
    try {
        await db.execAsync(`PRAGMA user_version = ${dbVersion};`);
        console.log("Database version updated to:", dbVersion);
    } catch (error) {
        console.error("Error updating database version:", error);
    }
};

// Initialize the database
export const initDatabase = async () => {
    try {
        // const isVersionMatch = await checkDatabaseVersion();
        // if (!isVersionMatch) {
        //     // Delete and reinitialize the database if the version doesn't match
        //     await deleteDatabase();
        // }
        await db.execAsync(`
      CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT NOT NULL UNIQUE,
        firstname TEXT NOT NULL,
        password TEXT NOT NULL,
        email TEXT NOT NULL,
        role TEXT NOT NULL,
        sync_status TEXT DEFAULT 'pending'
      );
    `);

        await db.execAsync(`
      CREATE TABLE IF NOT EXISTS farm_data (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        farmer_name TEXT NOT NULL,
        nation_id TEXT NOT NULL,
        farm_type TEXT NOT NULL,
        crop TEXT NOT NULL,
        location TEXT NOT NULL,
        sync_status TEXT DEFAULT 'pending'

      );
    `);

        await db.execAsync(`
        CREATE TABLE IF NOT EXISTS farm_options_data (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          farm_type TEXT NOT NULL,
          crop TEXT NOT NULL,
          location TEXT NOT NULL,
          sync_status TEXT DEFAULT 'pending'

        );
      `);
    } catch (error) {
        console.error("Database initialization failed:", error);
    }
};

// Insert a new user
export const insertUser = async (
    username: string,
    firstname: string,
    password: string,
    email: string,
    role: string
): Promise<number> => {
    console.log(username)
    console.log(password)
    console.log(role)
    try {
        // Validate input data
        if (!username || !password || !email || !role) {
            throw new Error("Username, password, and role are required");
        }

        const result = await db.runAsync(
            "INSERT INTO users (username, firstname, password, email, role, sync_status) VALUES ( ?, ?, ?, ?, ?, ?);",
            [username, firstname, password, email, role, "pending"]
        );

        console.log("User inserted with ID:", result.lastInsertRowId);
        return result.lastInsertRowId;
    } catch (error) {
        console.error("Error inserting user:", error);
        throw error;
    }
};

//Count users
export const countUsers = async (): Promise<number> => {
    try {
        // Execute the SQL query to count users
        const result = await db.getFirstAsync<{ userCount: number }>(
            "SELECT COUNT(*) AS userCount FROM users;"
        );

        // Extract the count from the result
        const userCount = result?.userCount || 0;
        console.log("Number of users:", userCount);
        return userCount;
    } catch (error) {
        console.error("Error counting users:", error);
        throw error;
    }
};

//Count users
export const countCrops = async (): Promise<number> => {
    try {
        // Execute the SQL query to count users
        const result = await db.getFirstAsync<{ userCount: number }>(
            "SELECT COUNT(*) AS userCount FROM users;"
        );

        // Extract the count from the result
        const userCount = result?.userCount || 0;
        console.log("Number of users:", userCount);
        return userCount;
    } catch (error) {
        console.error("Error counting users:", error);
        throw error;
    }
};

//Count users
export const countCropTypes = async (): Promise<number> => {
    try {
        // Execute the SQL query to count users
        const result = await db.getFirstAsync<{ userCount: number }>(
            "SELECT COUNT(*) AS userCount FROM users;"
        );

        // Extract the count from the result
        const userCount = result?.userCount || 0;
        console.log("Number of users:", userCount);
        return userCount;
    } catch (error) {
        console.error("Error counting users:", error);
        throw error;
    }
};

// Insert farm data
export const insertFarmData = async (data: {
    farmer_name: string;
    nation_id: string;
    farm_type: string;
    crop: string;
    location: string;
}): Promise<number> => {
    try {
        const result = await db.runAsync(
            "INSERT INTO farm_data (farmer_name, nation_id, farm_type, crop, location,sync_status) VALUES ( ?, ?, ?, ?, ?, ?);",
            [data.farmer_name, data.nation_id, data.farm_type, data.crop, data.location, "pending"]
        );

        console.log("Farm data inserted with ID:", result.lastInsertRowId);
        return result.lastInsertRowId;
    } catch (error) {
        console.error("Error inserting farm data:", error);
        throw error;
    }
};
// Insert farm options data
export const insertFarmOptionsData = async (data: {
    farm_type: string;
    crop: string;
    location: string;
}): Promise<number> => {
    try {
        const result = await db.runAsync(
            "INSERT INTO farm_options_data (farm_type, crop, location, sync_status) VALUES ( ?, ?, ?, ?);",
            [data.farm_type, data.crop, data.location, "pending"]
        );

        console.log("Farm Options data inserted with ID:", result.lastInsertRowId);
        return result.lastInsertRowId;
    } catch (error) {
        console.error("Error inserting farm options data:", error);
        throw error;
    }
};

// Fetch all farm data
export const fetchFarmData = async (): Promise<any[]> => {
    try {
        const result = await db.getAllAsync("SELECT * FROM farm_data;");
        console.log("Fetched farm data:", result);
        return result;
    } catch (error) {
        console.error("Error fetching farm data:", error);
        throw error;
    }
};

// Fetch all farm options data
export const fetchFarmOptionsData = async (): Promise<any[]> => {
    try {
        const result = await db.getAllAsync("SELECT * FROM farm_options_data;");
        console.log("Fetched farm data:", result);
        return result;
    } catch (error) {
        console.error("Error fetching farm options data:", error);
        throw error;
    }
};
// Fetch a user by username and password
export const fetchUser = async (
    username: string,
    password: string
): Promise<any> => {
    try {
        const result = await db.getFirstAsync(
            "SELECT * FROM users WHERE username = ? AND password = ?;",
            [username, password]
        );

        console.log("Fetched user:", result);
        return result;
    } catch (error) {
        console.error("Error fetching user:", error);
        throw error;
    }
};

// Fetch all the users
export const fetchAllUser = async (
    username: string,
    password: string
): Promise<any> => {
    try {
        const result = await db.getFirstAsync(
            "SELECT * FROM users",
            [username, password]
        );

        console.log("Fetched users:", result);
        return result;
    } catch (error) {
        console.error("Error fetching users:", error);
        throw error;
    }
};

// Fetch unsynced farm data
export const fetchUnsyncedFarmData = async (): Promise<any[]> => {
    try {
        const result = await db.getAllAsync("SELECT * FROM farm_data WHERE sync_status = 'pending';");
        console.log("Unsynced farm data:", result);
        return result;
    } catch (error) {
        console.error("Error fetching unsynced farm data:", error);
        throw error;
    }
};

// Update sync status for farm data
export const updateSyncStatus = async (id: number, status: string): Promise<void> => {
    try {
        await db.runAsync("UPDATE farm_data SET sync_status = ? WHERE id = ?;", [status, id]);
        console.log("Sync status updated for farm data ID:", id);
    } catch (error) {
        console.error("Error updating sync status:", error);
        throw error;
    }
};

