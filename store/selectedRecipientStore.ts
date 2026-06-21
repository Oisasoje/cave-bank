import { create } from "zustand";

export interface RecipientInterface {
  accountId: string;
  name: string;
  walletAddress: string;
}

interface RecipientStore {
  selectedRecipient: RecipientInterface | null;
  setSelectedRecipient: (recipient: RecipientInterface | null) => void;
}

const selectedRecipientStore = create<RecipientStore>((set) => ({
  selectedRecipient: null,
  setSelectedRecipient: (recipient) => set({ selectedRecipient: recipient }),
}));

export default selectedRecipientStore;
