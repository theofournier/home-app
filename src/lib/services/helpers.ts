// expand(3, 2) returns "($1, $2), ($3, $4), ($5, $6)"
export const expand = (rowCount: number, columnCount: number, startAt = 1) => {
  var index = startAt;
  return Array(rowCount)
    .fill(0)
    .map(
      (v) =>
        `(${Array(columnCount)
          .fill(0)
          .map((v) => `$${index++}`)
          .join(", ")})`
    )
    .join(", ");
};
