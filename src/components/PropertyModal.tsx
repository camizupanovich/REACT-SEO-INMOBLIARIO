import { FaX } from "react-icons/fa6";
import { PropertyDetail } from "./ProperyDetail";

export const PropertyModal = ({ open, onClose, property }: any) => {
  return (
    <div className={`modal-overlay active`}>
      <div className="modal">
        <div className="modal-header">
          <h2>{property?.titulo}</h2>
          <button className="modal-close" onClick={onClose}>
            <FaX/>
          </button>
        </div>
        <div className="modal-body">
          {/* Aquí reusás tu componente */}
          <PropertyDetail property={property} />
        </div>
      </div>
    </div>
  );
};
