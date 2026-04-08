import CRUDSection from "../CRUDSection";

interface Props {
  data: Record<string, any>[];
  onAdd: (item: Record<string, any>) => void;
  onUpdate: (index: number, item: Record<string, any>) => void;
  onDelete: (index: number) => void;
}

export default function LearningPlanSection({ data, onAdd, onUpdate, onDelete }: Props) {
  return (
    <CRUDSection
      title="Learning Plan"
      description="Week-by-week schedule of topics, activities, and assessments."
      columns={[
        { key: "week",       label: "Week" },
        { key: "topic",      label: "Topic",   truncate: true },
        { key: "ilo",        label: "ILO",     truncate: true },
        { key: "assessment", label: "Assessment" },
      ]}
      fields={[
        { key: "week",       label: "Week",                          required: true, placeholder: "e.g. 1" },
        { key: "topic",      label: "Topic",                         required: true, placeholder: "e.g. Introduction: Programming Basics" },
        { key: "ilo",        label: "Intended Learning Outcome",     required: true, type: "textarea", placeholder: "At the end of the unit, the student is able to..." },
        { key: "tla",        label: "Teaching & Learning Activities",type: "textarea", placeholder: "e.g. Lecture, Program Demo, Guided Programming" },
        { key: "resources",  label: "Learning Resources",            type: "textarea", placeholder: "e.g. PowerPoint presentation, Demo program" },
        { key: "assessment", label: "Assessment Strategies / Tools", placeholder: "e.g. Quiz, Programming Exercise" },
        { key: "evidence",   label: "Evidence of Outcome",           type: "textarea", placeholder: "e.g. A simple computer program with I/O statements." },
      ]}
      data={data}
      onAdd={onAdd}
      onUpdate={onUpdate}
      onDelete={onDelete}
    />
  );
}
