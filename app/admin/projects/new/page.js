import { workCategories } from "@/content/work";
import ProjectForm from "@/components/admin/ProjectForm";

export const dynamic = "force-dynamic";
export default function NewProject() {
  return <ProjectForm categories={workCategories.map(({ id, label }) => ({ id, label }))} />;
}
