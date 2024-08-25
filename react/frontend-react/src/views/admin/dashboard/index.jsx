import { useEffect, useState } from "react";
import { Card } from "../../components/Card";
import Cookies from "js-cookie";

export const Dashboard = () => {
    const [user, setUser] = useState([]);

    useEffect(() => {
        const userData = Cookies.get('user')

        if (userData) {
            setUser(JSON.parse(userData))
        }
    }, []);

    return (
        <>
            <div className="w-full">
                <Card>
                    <div className="text-left">
                        Selamat Datang, <span className="font-semibold">{user?.name}</span>
                    </div>
                </Card>
            </div>
        </>

    )
}
