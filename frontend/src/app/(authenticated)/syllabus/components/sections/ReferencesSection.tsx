import CRUDSection from "../CRUDSection";

interface Props {
  data: Record<string, any>[];
  onAdd: (item: Record<string, any>) => void;
  onUpdate: (index: number, item: Record<string, any>) => void;
  onDelete: (index: number) => void;
}

export default function ReferencesSection({ data, onAdd, onUpdate, onDelete }: Props) {
  return (
    <CRUDSection
      title="References"
      description="Books, journals, and materials used in this course."
      columns={[
        { key: "reference", label: "Reference", truncate: true },
      ]}
      fields={[
        {
          key: "reference",
          label: "Full Reference",
          required: true,
          type: "textarea",
          placeholder: "e.g. Hanly, J.R. & Koffman, E.B. (2005). Problem Solving and Program Design in C. 5th Ed.",
        },
      ]}
      data={data}
      onAdd={onAdd}
      onUpdate={onUpdate}
      onDelete={onDelete}
    />
  );
}
