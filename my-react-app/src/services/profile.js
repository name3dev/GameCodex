import { supabase } from "../lib/supabase";

// =========================
// GET PROFILE BY ID
// =========================
export async function getProfile(userId) {

    const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", userId)
        .single();

    if (error) throw error;

    return data;

}

// =========================
// GET PROFILE BY USERNAME
// =========================
export async function getProfileByUsername(username) {
    const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("username", username)
        .maybeSingle();

    if (error) throw error;

    return data;
}

// =========================
// UPDATE PROFILE
// =========================
export async function updateProfile(userId, updates) {

    const { data, error } = await supabase
        .from("profiles")
        .update(updates)
        .eq("id", userId)
        .select()
        .single();

    if (error) throw error;

    return data;

}

// =========================
// CHECK USERNAME
// =========================
export async function usernameExists(username) {

    const { data } = await supabase
        .from("profiles")
        .select("id")
        .eq("username", username)
        .maybeSingle();

    return !!data;

}