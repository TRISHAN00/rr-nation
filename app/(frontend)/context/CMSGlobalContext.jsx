"use client"
import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { getSettingApi } from "../api/page-api";

const CMSGlobalContext = createContext(null);
CMSGlobalContext.displayName = "CMSGlobalContext";

export default function CMSGlobalProvider({ children }) {
    const [cmsGlobal, setCMSGlobal] = useState({});
    const [loading, setLoading] = useState(true);

    const fetchCMSGlobal = useCallback(async () => {
        try {
            setLoading(true);
            const res = await getSettingApi();
            console.log(res)
            setCMSGlobal(res?.data);
        } catch (err) {
            console.error("Failed to load cms global data", err);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchCMSGlobal();
    }, [fetchCMSGlobal]);

    return (
        <CMSGlobalContext.Provider value={{ cmsGlobal, loading, fetchCMSGlobal }}>
            {children}
        </CMSGlobalContext.Provider>
    );
}

export function useCMSGlobal() {
    const context = useContext(CMSGlobalContext);
    if (context === null) {
        throw new Error("useCMSGlobal must be used within a CMSGlobalProvider");
    }
    return context;
}
