// currency formatter
const shillingKE = Intl.NumberFormat("en-KE", {
  style: "currency",
  currency: "KSH",
  maximumSignificantDigits: 3,
});

export { shillingKE };
