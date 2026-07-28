
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import { selectBidList, selectBidListLoading, selectBidListError } from "../../features/bids/bidSelectors";
import { loadBidList } from "../../features/bids/bidThunk";
import { setSort } from "../../features/filters/filterSlice";
import Table from "../Common/Table";
import Loader from "../Common/Loader";
import ErrorDisplay from "../Common/ErrorDisplay";
import NoData from "../Common/NoData";
import BidStatus from "./BidStatus";
import BidActions from "./BidActions";
import { formatDate, formatDateTime, getBidStatus, getBidTitle } from "../../utils/formatters";

const BidTable = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const items = useAppSelector(selectBidList);
  const loading = useAppSelector(selectBidListLoading);
  const error = useAppSelector(selectBidListError);
  const { SortBy, Descending } = useAppSelector((s) => s.filters.selected);

  const handleSortChange = (sortKey) => {
    const descending = SortBy === sortKey ? !Descending : false;
    dispatch(setSort({ sortBy: sortKey, descending }));
    dispatch(loadBidList());
  };

  const handleRetry = () => dispatch(loadBidList());

  const columns = [
    {
      header: "Bid Number",
      accessor: (row) => (
        <span className="text-primary fw-semibold" role="button" onClick={() => navigate(`/details/${row.bidNumber}`)}>
          {row.bidNumber}
        </span>
      ),
    },
    { header: "Title", accessor: (row) => getBidTitle(row) },
    { header: "Department", accessor: (row) => row.departmentName, sortKey: "Department" },
    { header: "Organisation", accessor: (row) => row.organisationName },
    { header: "Location", accessor: (row) => row.officeName },
    { header: "Category", accessor: (row) => row.itemCategory },
   
    { header: "Bid Date", accessor: (row) => formatDate(row.bidDate), sortKey: "BidDate" },
    // { header: "Closing Date", accessor: (row) => formatDateTime(row.bidEndDateTime), sortKey: "BidEndDateTime" },
    { header: "Status", accessor: (row) => <BidStatus status={getBidStatus(row)} /> },
    { header: "Actions", accessor: (row) => <BidActions bid={row} /> },
  ];

  if (loading) return <Loader label="Loading bids..." />;
  if (error) return <ErrorDisplay message={error} onRetry={handleRetry} />;
  if (items.length === 0) return <NoData message="No bids match your filters" />;

  return (
    <Table
      columns={columns}
      data={items}
      rowKey={(row) => row.bidNumber}
      sortBy={SortBy}
      descending={Descending}
      onSortChange={handleSortChange}
    />
  );
};

export default BidTable;