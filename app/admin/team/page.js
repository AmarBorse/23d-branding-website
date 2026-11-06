import AdminNav from "@/components/admin/AdminNav";
import TeamManager from "@/components/admin/TeamManager";

export const dynamic = "force-dynamic";
export default function TeamAdmin() {
  return <><AdminNav /><TeamManager /></>;
}
