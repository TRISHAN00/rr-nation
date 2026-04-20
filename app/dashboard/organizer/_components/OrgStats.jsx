import { useState } from "react";

export default function OrgStats() {
    const [organizers, setOrganizers] = useState(null);
    const [loading, setLoading] = useState(false);

    const fetchData = async () => {
            try {
                setLoading(true);
                const res = await getMemberOverviewData();
                setMembers(res?.data);
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        };
    
        useEffect(() => {
            fetchData();
        }, []);
    return (
        <div>OrgStats</div>
    )
}
