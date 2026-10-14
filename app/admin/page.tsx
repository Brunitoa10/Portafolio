import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import AdminDashboard from "./AdminDashboard";

export default async function AdminPage() {
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  const [{ data: projects }, { data: timeline }, { data: skills }] =
    await Promise.all([
      supabase.from("projects").select("*").order("sort_order").order("id"),
      supabase
        .from("timeline")
        .select("*")
        .order("sort_order", { ascending: false })
        .order("id", { ascending: false }),
      supabase.from("skill_categories").select("*").order("sort_order").order("id"),
    ]);

  return (
    <AdminDashboard
      email={user.email ?? ""}
      projects={projects ?? []}
      timeline={timeline ?? []}
      skills={skills ?? []}
    />
  );
}