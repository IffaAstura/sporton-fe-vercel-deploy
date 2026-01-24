"use client";

import Button from "@/app/(landing)/components/ui/button";
import { FiPlus } from "react-icons/fi";
import TransactionsTable from "../../components/transactions/transaction-table";
import TransactionstModal from "../../components/transactions/transaction-modal";
import { useState } from "react";

const TransactionsManagement = () => {
    const [isOpen, setIsOpen] = useState(false);

    const handleCloseModal = () => {
        setIsOpen(false)
    };

    const handleViewDetails = () => [
        setIsOpen(true)
    ];

    return(
        <div>
            <div className="flex justify-between items-center mb-10">
                <div>
                    <h1 className="font-bold text-2xl">Transactions</h1>
                    <p className="opacity-50">Verify incoming payments and manage orders.</p>
                </div>
                </div>
            <TransactionsTable onViewDetails={handleViewDetails}/>
            <TransactionstModal isOpen={isOpen} onClose={handleCloseModal}/>
        </div>
    );
};

export default TransactionsManagement;