export type TModalRiewProps = {
  closeModal: () => void;
  isModalOpen: boolean;
  control: any;
  onChangeRate: (value: number) => void;
  handlePostReview: () => void;
};
export type TFormValues = {
  description: string;
  title: string;
};
