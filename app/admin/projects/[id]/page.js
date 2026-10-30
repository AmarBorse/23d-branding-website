import { workCategories } from "@/content/work";
import ProjectForm from "@/components/admin/ProjectForm";

export const dynamic = "force-dynamic";
export default function EditProject({ params }) {
  return <ProjectForm id={params.id} categories={workCategories.map(({ id, label }) => ({ id, label }))} />;
}
