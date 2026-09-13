/**
 * Splits a string into per-word spans so a scroll timeline can light them one at
 * a time. Each word keeps its trailing space inside the span, so selection and
 * copy-paste still produce the original sentence.
 */
export function SplitWords({ text, className = "" }: { text: string; className?: string }) {
  const words = text.split(" ");
  return (
    <>
      {words.map((word, i) => (
        <span
          key={`${word}-${i}`}
          data-word
          className={`inline-block transition-none ${className}`}
        >
          {word}
          {i < words.length - 1 ? " " : ""}
        </span>
      ))}
    </>
  );
}
