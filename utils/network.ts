import NetInfo from "@react-native-community/netinfo";

// Check if the device is online
export const isOnline = async (): Promise<boolean> => {
    const state = await NetInfo.fetch();
    return state.isConnected ?? false;
};

// Listen for network changes
export const onNetworkChange = (callback: (isConnected: boolean) => void) => {
    return NetInfo.addEventListener((state) => {
        callback(state.isConnected ?? false);
    });
};