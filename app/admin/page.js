import { Suspense } from "react";
import { workCategories } from "@/content/work";
import AdminDashboard from "@/components/admin/AdminDashboard";
import AdminNav from "@/components/admin/AdminNav";

export const dynamic = "force-dynamic";
const cats = workCategories.map(({ id, label }) => ({ id, label }));

export default function AdminPage() {
  return <><AdminNav /><Suspense><AdminDashboard categories={cats} /></Suspense></>;
}
