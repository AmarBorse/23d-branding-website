import { Suspense } from "react";
import { workCategories } from "@/content/work";
import AdminDashboard from "@/components/admin/AdminDashboard";

export const dynamic = "force-dynamic";
const cats = workCategories.map(({ id, label }) => ({ id, label }));

export default function AdminPage() {
  return <Suspense><AdminDashboard categories={cats} /></Suspense>;
}
