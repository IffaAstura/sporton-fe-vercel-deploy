import Modal from "../ui/modal";
import ImageUploadPreview from "../ui/image-upload-preview";
import { useState } from "react";
import Button from "@/app/(landing)/components/ui/button";

type TBankInfoModal = {
    isOpen: boolean;
    onClose: () =>  void; 
}

const BankInfoModal = ({isOpen, onClose}: TBankInfoModal) => {
    return (
        <Modal isOpen={isOpen} onClose={onClose} title="Add New Bank Account">
            <div className="flex flex-col gap-6">
                    <div className="flex flex-col gap-4 w-full">
                        <div className="input-group-admin">
                            <label htmlFor="BankInfoName">Bank Name</label>
                            <input 
                                type="text"
                                id="bankName"
                                name="bankName"
                                placeholder="e. g. Mandiri, BCA, BRI"
                             />
                        </div>
                        <div className="input-group-admin">
                            <label htmlFor="BankInfoName">Account Number</label>
                            <input 
                                type="text"
                                id="accountNumber"
                                name="accountNumber"
                                placeholder="123123123"
                             />
                        </div>
                        <div className="input-group-admin">
                            <label htmlFor="BankInfoName">Account Name / Holder</label>
                            <input 
                                type="text"
                                id="accountName"
                                name="accountName"
                                placeholder="Holder Name as registered on the account"
                             />
                        </div>
                            <Button className="ml-auto mt-3 rounded-lg text-white cursor-pointer">Create Bank Account</Button>
                        </div>
                    </div>
        </Modal>
    )
}

export default BankInfoModal;