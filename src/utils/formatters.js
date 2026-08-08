import dayjs from "dayjs";

export const formatCurrency = (value) => {
  if (value === undefined || value === null) return "-";
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(value);
};

export const formatDate = (value) => {
  if (!value) return "-";
  return dayjs(value).format("DD MMM YYYY");
};

export const formatDateTime = (value) => {
  if (!value) return "-";
  return dayjs(value).format("DD MMM YYYY hh:mm A");
};

export const toApiDate = (value) => {
  if (!value) return undefined;
  return dayjs(value).format("YYYY-MM-DD");
};

// Derives display status from BidListDto's isActive / isClosingSoon flags
export const getBidStatus = (bid) => {
  console.log("Bid:", bid.bidNumber);
  console.log("isActive:", bid.isActive);
  console.log("isClosingSoon:", bid.isClosingSoon);

  if (bid.isClosingSoon) return "ClosingSoon";
  if (bid.isActive) return "Active";
  return "Expired";
};

// export const getBidTitle = (bid) =>
//   bid.cardItemName || bid.boqtitle || bid.itemCategory || "-";
