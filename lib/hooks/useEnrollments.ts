"use client";

import { useState } from "react";
import { Enrollment, EnrollmentTokenResponse } from "../types/enrollment";

/**
 * Hook to get and manage enrollments
 */

export function useEnrollments() {
    const [enrollment, setEnrollments] = useState<Enrollment[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isUpdating, setIsUpdating] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const generateToken = async (): Promise<{ success: boolean; data?: EnrollmentTokenResponse; error?: string }> => {
        setIsLoading(true);
        setError(null);

        try {
            const res = await fetch("/api/enrollments/generate", {
                method: "POST",
                credentials: "include",
            });

            const responseData = await res.json().catch(() => ({}));

            if (!res.ok) {
                const msg = responseData?.error || responseData?.message || "Failed to generate token";
                setError(msg);
                return { success: false, error: msg };
            }

            return { success: true, data: responseData };
        } catch (err) {
            const msg = "Network error";
            setError(msg);
            return { success: false, error: msg };
        } finally {
            setIsLoading(false);
        }
    };

    return {
        enrollment,
        generateToken,
        isLoading,
        isUpdating,
        error,
    };
}