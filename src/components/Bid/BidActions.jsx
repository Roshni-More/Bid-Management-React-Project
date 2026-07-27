
import { useNavigate } from "react-router-dom";
import { FiEye } from "react-icons/fi";

const BidActions = ({ bid }) => {
  const navigate = useNavigate();
  return (
    <button
      className="btn btn-sm btn-outline-primary"
      onClick={() => navigate(`/details/${bid.bidNumber}`)}
      title="View Details"
    >
      <FiEye />
    </button>
  );
};

export default BidActions;