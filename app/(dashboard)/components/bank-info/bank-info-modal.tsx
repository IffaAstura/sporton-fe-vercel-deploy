import Modal from "../ui/modal";
import ImageUploadPreview from "../ui/image-upload-preview";
import { useEffect, useState } from "react";
import Button from "@/app/(landing)/components/ui/button";
import { Bank } from "@/app/types";
import { createBank, updateBank } from "@/app/services/bank.service";
import { toast } from "react-toastify";

type TBankInfoModal = {
    isOpen: boolean;
    onClose: () =>  void; 
    bank: Bank | null;
    onSuccess: () => void;
}

const BankInfoModal = ({isOpen, onClose, bank, onSuccess}: TBankInfoModal) => {
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [formData, setFormData] = useState<Partial<Bank>>({
        accountName: "",
        accountNumber: "",
        bankName: ""
    })

    const isEditMode = !!bank;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const {id, value} = e.target;
        setFormData((prev) => ({...prev, [id]: value}));
    }

    const handelSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsSubmitting(true)
        try {
            if (bank) {
                await updateBank(bank._id, formData)
            } else {
                await createBank(formData)
            }

            setFormData ({
                accountName: "",
                accountNumber: "",
                bankName: ""
            })
            onSuccess?.()
            onClose();
            toast.success(isEditMode ? "Bank info Updated Successfully": "Bank info created successfully")
        }   catch(error) {
            console.error(isEditMode ? "Failed to update bank info": "Failed to create bank info", error)
            toast.error(isEditMode ? "Failed to update bank info": "Failed to create bank info")
        }   finally {
            setIsSubmitting(false)
        }
    }

    useEffect(() => {
        if (isEditMode && isOpen) {
            setFormData({
                accountName: bank.accountName,
                accountNumber: bank.accountNumber,
                bankName: bank.bankName,
            })
        }   else if (isOpen) {
            setFormData ({
                accountName: "",
                accountNumber: "",
                bankName: ""
            })
        }
    },[bank, isOpen])

    return (
        <Modal isOpen={isOpen} onClose={onClose} title="Add New Bank Account">
            <form  onSubmit={handelSubmit} className="flex flex-col gap-6">
                <div className="flex flex-col gap-4 w-full">
                    <div className="input-group-admin">
                        <label htmlFor="BankInfoName">Bank Name</label>
                        <input type="text" id="bankName" name="bankName" placeholder="e. g. Mandiri, BCA, BRI" value={formData.bankName} onChange={handleChange}/>
                    </div>
                    <div className="input-group-admin">
                        <label htmlFor="BankInfoName">Account Number</label>
                        <input type="text" id="accountNumber" name="accountNumber" placeholder="123123123" value={formData.accountNumber} onChange={handleChange}/>
                    </div>
                    <div className="input-group-admin">
                        <label htmlFor="BankInfoName">Account Name / Holder</label>
                        <input type="text" id="accountName" name="accountName" placeholder="Holder Name as registered on the account" value={formData.accountName} onChange={handleChange}/>
                    </div>
                    <Button className="ml-auto mt-3 rounded-lg text-white cursor-pointer" type="submit" onClick={handelSubmit} disabled={isSubmitting}>
                        {
                            isEditMode ? "Update Bank Info":"Create Bank Info"
                        }
                    </Button>
                </div>
            </form>
        </Modal>
    )
}

export default BankInfoModal;