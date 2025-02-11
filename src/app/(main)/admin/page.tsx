"use server";
import { redirect } from "next/navigation";
import { createServer } from "@/lib/supabase/server";
import { getUserRole } from "@/middleware";

export default async function AdminPage() {
    const supabase = await createServer();

    const {
        data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
        redirect("/");
    }

    const isAdmin = await getUserRole(user.id);

    if (!isAdmin) {
        redirect("/");
    }

    return (
        <div>
            <h1>Admin Dashboard</h1>

        </div>
    );
}
