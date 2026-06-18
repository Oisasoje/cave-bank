export function formatDate(
  dateInput: string | Date | undefined | null,
  type: "full" | "short" = "full"
): string {
  if (!dateInput) return "";
  try {
    const date = new Date(dateInput);
    if (isNaN(date.getTime())) return "";

    if (type === "short") {
      return date
        .toLocaleString("en-US", {
          year: "numeric",
          month: "short",
          day: "numeric",
          hour: "numeric",
          minute: "2-digit",
          hour12: true,
        })
        .replace(" at ", ", ");
    }

    return date
      .toLocaleString("en-US", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
      })
      .replace(" at ", ", ");
  } catch (error) {
    console.error("Error formatting date:", error);
    return "";
  }
}
