import { supabase } from "../lib/supabase";

// =========================
// REGISTER
// =========================
export async function register(email, password, username) {

    const { data, error } = await supabase.auth.signUp({
        email,
        password,
    });

    if (error) throw error;

    const { error: profileError } = await supabase
        .from("profiles")
        .insert({
            id: data.user.id,
            username,
            level: 1,
            xp: 0,
            avatar_url: "",
            bio: "",
        });

    if (profileError) throw profileError;

    const { error: settingsError } = await supabase
        .from("user_settings")
        .insert({
            id: data.user.id,
            theme: "modern",
            language: "en",
            animations: true,
            sounds: true,
        });

    if (settingsError) throw settingsError;

    return data.user;
}

// =========================
// LOGIN
// =========================
export async function login(email, password) {

    const { data, error } =
        await supabase.auth.signInWithPassword({
            email,
            password,
        });

    if (error) throw error;

    return data.user;
}

// =========================
// LOGOUT
// =========================
export async function logout() {

    const { error } = await supabase.auth.signOut();

    if (error) throw error;

}

// =========================
// CURRENT SESSION
// =========================
export async function getSession() {

    const { data, error } =
        await supabase.auth.getSession();

    if (error) throw error;

    return data.session;

}

// =========================
// CURRENT USER
// =========================
export async function getUser() {

    const { data, error } =
        await supabase.auth.getUser();

    if (error) throw error;

    return data.user;

}

// =========================
// RESTORE SESSION
// =========================
export async function restoreSession() {

    const session = await getSession();

    if (!session) return null;

    return session.user;

}