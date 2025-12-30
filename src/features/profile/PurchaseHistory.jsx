import { useSelector } from "react-redux";

import { useProfile } from "./useProfile";
import { getPurchaseHistory } from "../../services/apiProfile";

import Spinner from "../../ui/Spinner";

import { formatNumber } from "../../utils/formatNumber";
// import SendMail from "../mail/SendMail";
import SendEmailV2 from "../mail/SendEmailV2";

export default function PurchaseHistory() {
  const { isLogin, user } = useSelector((state) => state.auth);

  const { data: purchaseHistory, loading } = useProfile(
    getPurchaseHistory,
    user?.id
  );

  if (loading) return <Spinner />;

  return (
    <div>
      <SendEmailV2 />
      <div className="flex flex-col gap-y-2">
        <p className="text-xl font-bold">Lịch sử giao dịch</p>
        <p className="text-sm">
          Hiển thị tất cả các giao dịch bạn dã thực hiện tại Divine Shop
        </p>
        <div className="border-b border-gray-500/50  my-4 w-full"></div>
      </div>

      <div className="w-full overflow-x-auto shadow-md rounded-lg border border-gray-200">
        <table className="w-full text-sm text-left text-gray-500">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 border-b">
            <tr>
              <th className="px-6 py-4 font-bold">Thời gian</th>
              <th className="px-6 py-4 font-bold">Nội dung giao dịch</th>
              <th className="px-6 py-4 font-bold text-right">Số tiền</th>
            </tr>
          </thead>
          <tbody>
            {purchaseHistory && purchaseHistory.length > 0 ? (
              purchaseHistory.map((item, index) => (
                <tr
                  key={item.time + index}
                  className="bg-white border-b hover:bg-gray-50 transition-colors"
                >
                  <td className="px-6 py-4 whitespace-nowrap text-gray-600">
                    {item.time}
                  </td>
                  <td className="px-6 py-4 font-medium text-gray-900">
                    {item.desc}
                  </td>
                  <td
                    className={`px-6 py-4 text-right font-bold ${
                      item.transaction_type === "DEPOSIT"
                        ? "text-green-600"
                        : "text-red-600"
                    }`}
                  >
                    {item.transaction_type === "DEPOSIT" ? "+ " : ""}
                    {formatNumber(item.amount)}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="3"
                  className="px-6 py-10 text-center text-gray-400"
                >
                  Chưa có lịch sử giao dịch nào.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
