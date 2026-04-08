import CRUDSection from "../CRUDSection";

interface Props {
  data: Record<string, any>[];
  onAdd: (item: Record<string, any>) => void;
  onUpdate: (index: number, item: Record<string, any>) => void;
  onDelete: (index: number) => void;
}

export default function GradingSystemSection({ data, onAdd, onUpdate, onDelete }: Props) {
  const total = data.reduce((sum, row) => sum + (Number(row.weight) || 0), 0);

  return (
    <div>
      <CRUDSection
        title="Grading System"
        description="Define the grading criteria and their respective weights."
        columns={[
          { key: "criteria", label: "Criteria" },
          { key: "weight",   label: "Weight (%)" },
        ]}
        fields={[
          { key: "criteria", label: "Criteria", required: true, placeholder: "e.g. Major Exams" },
          { key: "weight",   label: "Weight (%)", type: "number", required: true, placeholder: "e.g. 30" },
        ]}
        data={data}
        onAdd={onAdd}
        onUpdate={onUpdate}
        onDelete={onDelete}
      />
      {data.length > 0 && (
        <div className={`mt-3 text-right text-sm font-bold ${total === 100 ? "text-emerald-600" : "text-red-500"}`}>
          Total: {total}% {total !== 100 && "(should equal 100%)"}
        </div>
      )}
    </div>
  );
}
