const formatCurrency = (amount: number, currency?: "USD" | "INR") => {
  let format = "en-US";
  if (currency === "INR") {
    format = "en-IN";
  }
  return new Intl.NumberFormat(format, {
    style: "currency",
    currency: currency || "USD",
    minimumFractionDigits: 0,
    compactDisplay: "short",
  }).format(amount);
};
export default formatCurrency;
