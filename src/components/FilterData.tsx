import MultiSortModal from "./MultiSortModal"; 
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { closeModal, openModal } from "../store/modalSlice";
import { RiArrowUpDownLine } from "react-icons/ri";
import { FiSearch, FiFilter, FiPlus } from "react-icons/fi";
import type { Dispatch, SetStateAction } from 'react';

type ClientTypeProps = {
    clientType: string, 
    activeClientType :string, 
    setActiveClientType: Dispatch<SetStateAction<string>>
}
type FilterDataProps = { 
    activeClientType :string, 
    setActiveClientType: Dispatch<SetStateAction<string>>
}

const ClientType :React.FC<ClientTypeProps>= ({clientType, activeClientType, setActiveClientType}) => (
<span className={`p-4 cursor-pointer hover:text-black ${activeClientType === clientType && "border-b-2 border-black text-black"}`} onClick={()=>setActiveClientType(clientType)}>{clientType}</span>
);

function FilterData({activeClientType = "All", setActiveClientType} : FilterDataProps ) {
    const dispatch = useAppDispatch();
    const modalDisplay = useAppSelector((state) => state.modal.isOpen);
    const sorts = useAppSelector((state) => state.sort.sorts);

    return (
        <div className="relative px-2">
        <div className="flex justify-between items-center">
            <div className="flex gap-2 text-gray-500 font-semibold">
                <ClientType clientType="All" activeClientType={activeClientType} setActiveClientType={setActiveClientType} />
                <ClientType clientType="Individual" activeClientType={activeClientType} setActiveClientType={setActiveClientType} />
                <ClientType clientType="Company" activeClientType={activeClientType} setActiveClientType={setActiveClientType} /> 
            </div>
            <div className="flex gap-2 items-center text-gray-500">
                <span className="hover:bg-gray-200 p-2 hover:rounded-full"><FiSearch size={20} className="cursor-pointer"/></span>
                <span className="relative inline-block hover:bg-gray-200 p-2 hover:rounded-full">
                    <RiArrowUpDownLine size={24} className="cursor-pointer" onClick={() => dispatch(openModal())} />
                    {sorts.length > 0 && (
                        <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                            {sorts.length}
                        </span>
                    )}
                </span>
                <span className="hover:bg-gray-200 p-2 hover:rounded-full me-4"><FiFilter size={20} className="cursor-pointer" /></span>              
                <button className="flex gap-2 items-center bg-gray-800 text-white px-4 py-2 rounded-lg cursor-pointer"><FiPlus size={18} /> Add Client</button>
            </div>
        </div>
        {modalDisplay && (
            <MultiSortModal onClose={()=>dispatch(closeModal())} />
        )}
        </div>
    )
}

export default FilterData;
