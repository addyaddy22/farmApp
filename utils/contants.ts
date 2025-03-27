import AsyncStorage from "@react-native-async-storage/async-storage";

// Load user data from AsyncStorage
export const loadUserData = async () => {
    try {
        const userData = await AsyncStorage.getItem("user");
        if (userData) {
            const user = JSON.parse(userData);
            console.log("User data loaded successfully:", user);
            return user;
        }
        return null;
    } catch (error) {
        console.error("Error loading user data:", error);
        return null;
    }
};



export const getUserData = async () => {
    try {
        const userData = await AsyncStorage.getItem("user");
        if (userData) {
            const user = JSON.parse(userData);
            console.log("User data loaded successfully:", user);
            return user;
        }
        return null;
    } catch (error) {
        console.error("Error loading user data:", error);
        return null;
    }
};

// Clear user data from AsyncStorage
export const clearUserData = async () => {
    try {
        await AsyncStorage.removeItem("user");
        console.log("User data cleared successfully");
    } catch (error) {
        console.error("Error clearing user data:", error);
    }
};