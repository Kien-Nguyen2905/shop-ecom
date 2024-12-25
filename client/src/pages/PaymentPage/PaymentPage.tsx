import { usePaymentPage } from './usePaymentPage';

const PaymentPage = () => {
  const { order } = usePaymentPage();
  return (
    <div className="container flex items-center justify-center h-[700px]">
      <div className="p-6 text-center bg-white rounded-lg shadow-lg">
        <h1 className="mb-4 text-2xl font-bold text-primary">
          QR Code Payment
        </h1>
        <p className="mb-6 text-darkGrey">
          Scan the QR code below to make a payment.
        </p>
        <div className="inline-block p-4 bg-white border border-gray-200 rounded-lg">
          <img
            src={`https://qr.sepay.vn/img?acc=0704590124&bank=MBBank&amount=${order?.value}&des=${order?.content}`}
            alt="QR Code"
            className="object-cover w-64 h-64"
          />
        </div>
        <p className="mt-4 text-sm text-textGrey">
          Bank: MBBank | Account: 0704590124
        </p>
        <p className="mt-1 text-sm text-textGrey">NGUYEN TRUNG KIEN</p>
      </div>
    </div>
  );
};

export default PaymentPage;
