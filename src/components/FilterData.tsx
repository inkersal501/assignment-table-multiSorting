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
<span className={`p-4 cursor-pointer ${activeClientType === clientType && "border-b-2 border-black text-black"}`} onClick={()=>setActiveClientType(clientType)}>{clientType}</span>
);

function FilterData({activeClientType = "All", setActiveClientType} : FilterDataProps ) {
    return (
        <div className="flex justify-between items-center">
            <div className="flex gap-2 text-gray-500 font-semibold">
                <ClientType clientType="All" activeClientType={activeClientType} setActiveClientType={setActiveClientType} />
                <ClientType clientType="Individual" activeClientType={activeClientType} setActiveClientType={setActiveClientType} />
                <ClientType clientType="Company" activeClientType={activeClientType} setActiveClientType={setActiveClientType} /> 
            </div>
            <div className="flex gap-5 items-center text-gray-500">
                <span><FiSearch size={20} className="cursor-pointer"/></span>
                <span><RiArrowUpDownLine size={20} className="cursor-pointer" /></span>
                <span><FiFilter size={20} className="cursor-pointer" /></span>              
                <button className="flex gap-2 items-center bg-gray-800 text-white px-4 py-2 rounded-lg cursor-pointer"><FiPlus size={18} /> Add Client</button>
            </div>
        </div>
    )
}

export default FilterData;
