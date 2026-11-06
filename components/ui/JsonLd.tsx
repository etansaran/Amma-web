type Props = { data: Record<string, unknown> | Record<string, unknown>[] };

/** Renders one or more JSON-LD blocks. Safe against </script> injection. */
export function JsonLd({ data }: Props) {
  const list = Array.isArray(data) ? data : [data];
  return (
    <>
      {list.map((item, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(item).replace(/</g, "\\u003c"),
          }}
        />
      ))}
    </>
  );
}
