import CRUDSection from "../CRUDSection";

interface Props {
  data: Record<string, any>[];
  onAdd: (item: Record<string, any>) => void;
  onUpdate: (index: number, item: Record<string, any>) => void;
  onDelete: (index: number) => void;
}

export default function CourseOutcomesSection({ data, onAdd, onUpdate, onDelete }: Props) {
  return (
    <CRUDSection
      title="Course Outcomes"
      description="At the end of the semester, the students should be able to:"
      columns={[
        { key: "code",        label: "CO Code" },
        { key: "description", label: "Description", truncate: true },
      ]}
      fields={[
        { key: "code",        label: "CO Code",      required: true, placeholder: "e.g. CO1" },
        { key: "description", label: "Description",  required: true, type: "textarea", placeholder: "Describe what students should be able to do..." },
      ]}
      data={data}
      onAdd={onAdd}
      onUpdate={onUpdate}
      onDelete={onDelete}
    />
  );
}
