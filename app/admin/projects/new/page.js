import { workCategories } from "@/content/work";
import ProjectForm from "@/components/admin/ProjectForm";
import AdminNav from "@/components/admin/AdminNav";

export const dynamic = "force-dynamic";
export default function NewProject() {
  return <><AdminNav /><ProjectForm categories={workCategories.map(({ id, label }) => ({ id, label }))} /></>;
}
