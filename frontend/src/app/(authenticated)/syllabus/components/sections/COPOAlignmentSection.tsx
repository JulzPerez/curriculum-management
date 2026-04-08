import CRUDSection from "../CRUDSection";

interface Props {
  data: Record<string, any>[];
  onAdd: (item: Record<string, any>) => void;
  onUpdate: (index: number, item: Record<string, any>) => void;
  onDelete: (index: number) => void;
}

export default function COPOAlignmentSection({ data, onAdd, onUpdate, onDelete }: Props) {
  return (
    <CRUDSection
      title="CO-PO Alignment"
      description="Map each Course Outcome to the Program Outcomes it supports."
      columns={[
        { key: "co",          label: "Course Outcome" },
        { key: "po",          label: "Program Outcome" },
        { key: "description", label: "PO Description", truncate: true },
      ]}
      fields={[
        { key: "co",          label: "Course Outcome",    required: true, placeholder: "e.g. CO1" },
        { key: "po",          label: "Program Outcome",   required: true, placeholder: "e.g. PO-a" },
        { key: "description", label: "PO Description",    type: "textarea", placeholder: "Describe the program outcome..." },
      ]}
      data={data}
      onAdd={onAdd}
      onUpdate={onUpdate}
      onDelete={onDelete}
    />
  );
}
