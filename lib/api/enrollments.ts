
import { API_ENDPOINTS } from "@/config/constants";
import { backendFetch } from "../api";
 
/**
 * 
 * generate token for enrollment 
 */
export async function generateEnrollmentTokenBackend(accessToken: string) {
    return backendFetch(API_ENDPOINTS.ENROLLMENTS.CREATE,{
        method: "POST",
    }, accessToken);
}