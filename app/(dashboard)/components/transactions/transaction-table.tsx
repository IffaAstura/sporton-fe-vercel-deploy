import priceFormatter from "@/app/utils/price-formatter";
import { FiEye } from "react-icons/fi";

const transactionsData = [
    {
        date: "23/02/2026 19:32",
        customer: "John Doe",
        contact: "08123456789",
        total: 450000,
        status: "pending",
    },
    {
        date: "23/02/2026 13:32",
        customer: "Delon Mark",
        contact: "08987654321",
        total: 753000,
        status: "paid",
    },
    {
        date: "23/02/2026 19:32",
        customer: "Seoo Char",
        contact: "081357924680",
        total: 800000,
        status: "rejected",
    },
]

type TTransactionsTable = {
   onViewDetails: () => void; 
};;

const TransactionsTable = ({onViewDetails}: TTransactionsTable) => {
    const getStatusColor = (status: string) => {
        switch (status.toLocaleLowerCase()) {
            case "pending":
                return "bg-yellow-100 text-yellow-600 border-yellow-300";
            case "rejected":
                return "bg-red-100 text-red-600 border-red-300";
            case "paid":
                return "bg-green-100 text-green-600 border-green-300";
        }
    };

    return(
        <div className="bg-white rounded-xl border border-gray-200">
            <table className="w-full text-left border-collapse">
                <thead>
                    <tr className="border-b border-gray-200">
                        <th className="px-6 py-4 font-semibold">Date</th>
                        <th className="px-6 py-4 font-semibold">Customer</th>
                        <th className="px-6 py-4 font-semibold">Contact</th>
                        <th className="px-6 py-4 font-semibold">total</th>
                        <th className="px-6 py-4 font-semibold">Status</th>
                        <th className="px-6 py-4 font-semibold">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {transactionsData.map((data, index) => (
                        <tr key={index} className="border-b border-gray-200 last:border-b-0">
                            <td className="px-6 py-4 font-medium">{data.date}</td>
                            <td className="px-6 py-4 font-medium">{data.customer}</td>
                            <td className="px-6 py-4 font-medium">{data.contact}</td>
                            <td className="px-6 py-4 font-medium">{priceFormatter(data.total)}</td>
                            <td className="px-6 py-4 font-medium">
                                <div className={`px-4 py-1 rounded-full border text-center w-fit text-sm uppercase ${getStatusColor(data.status)}`}>{data.status}</div>
                            </td>
                            <td className="px-6 py-7.5 self-center flex gap-3 text-gray-600 items-center">
                                <button onClick={onViewDetails} className="flex items-center gap-2 cursor-pointer hover:bg-gray-100 py-1 px-2 rounded-md"><FiEye size={18}/>View Details</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default TransactionsTable;