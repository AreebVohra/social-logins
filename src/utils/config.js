import { GoogleSignin } from "@react-native-community/google-signin";

export async function googleSignInConfig() {
    await GoogleSignin.configure({
        scopes: ['https://www.googleapis.com/auth/drive.readonly'],
        webClientId: '820492788832-b3f146r9c7cfgi8eas038vo3t0rjfu9e.apps.googleusercontent.com',
        offlineAccess: true,
    });
}