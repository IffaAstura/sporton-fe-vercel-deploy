"use client";

import Button from "@/app/(landing)/components/ui/button";
import { FiPlus } from "react-icons/fi";
import TransactionsTable from "../../components/transactions/transaction-table";
import TransactionstModal from "../../components/transactions/transaction-modal";
import { useEffect, useState } from "react";
import { getAllTransactions, updateTransaction } from "@/app/services/transaction.service";
import { Transaction } from "@/app/types";
import { toast } from "react-toastify";

const TransactionsManagement = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);    
    const [selectesTransaction, setSelectedTransaction] = useState<Transaction | null>(null);
    const [transaction, setTransaction] = useState<Transaction[]>([])

    const fetchTransactions = async () => {
        try {
            const data = await getAllTransactions()
            setTransaction(data)
        } catch(error) {
            console.error("Failed to fetch transaction", error)
        }
    }

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedTransaction(null)
    }

    const handleViewDetails = (transaction: Transaction) => {
        setIsModalOpen(true)
        setSelectedTransaction(transaction)
    } 

    const handleStatusChange = async (id: string, status: "paid" | "rejected") => {
        try {
            const formData = new FormData()
            formData.append('status', status)
            await updateTransaction(id, formData)

            toast.success("Transactions status updated")

            await fetchTransactions()
        }   catch (error) {
            console.error("Failed to update transaction status", error)
            toast.error("Failed to update transaction status")
        }   finally {
            setIsModalOpen(false)
        }
    }

    useEffect(() => {
        fetchTransactions()
    }, [])


    return(
        <div>
            <div className="flex justify-between items-center mb-10">
                <div>
                    <h1 className="font-bold text-2xl">Transactions</h1>
                    <p className="opacity-50">Verify incoming payments and manage orders.</p>
                </div>
                </div>
            <TransactionsTable transactions={transaction} onViewDetails={handleViewDetails}/>
            <TransactionstModal transaction={selectesTransaction} onStatusChange={handleStatusChange} isOpen={isModalOpen} onClose={handleCloseModal}/>
        </div>
    );
};

export default TransactionsManagement;