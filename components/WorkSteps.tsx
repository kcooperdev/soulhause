import { workSteps } from "@/lib/offerings";

export function WorkSteps() {
  return (
    <ol className="co-steps">
      {workSteps.map((step, index) => (
        <li key={step.name}>
          <b>
            <span>{index + 1}</span>
            {step.name}
          </b>
          <p>{step.line}</p>
        </li>
      ))}
    </ol>
  );
}
