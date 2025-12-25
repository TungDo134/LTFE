import React from "react";

const ProductInformation = ({ metadata }) => {
  const details = metadata?.deep_details;
  if (!details) return null;

  return (
    <div className="max-w-5xl mx-auto p-4 md:p-8 bg-white text-[#444] leading-relaxed">
      {/* SECTION: Sơ lược thông tin */}
      <div className="grid grid-cols-1 md:grid-cols-[250px_1fr] gap-4 mb-10">
        <h2 className="text-xl font-bold text-gray-800">Chi tiết sản phẩm</h2>
        <div
          className="text-[14.5px] prose prose-sm max-w-none 
            prose-h2:text-[20px] prose-h2:font-bold prose-h2:mb-4 
            prose-ol:list-decimal prose-ol:ml-5 
            prose-img:rounded-lg prose-img:my-4
            prose-strong:text-gray-900"
          dangerouslySetInnerHTML={{ __html: details.product_details }}
        />
      </div>

      {/* SECTION: Cấu hình */}
      <div className="grid grid-cols-1 md:grid-cols-[250px_1fr] gap-4 mb-10">
        <h2 className="text-xl font-bold text-gray-800">Cấu hình</h2>
        <div className="text-[14.5px] space-y-1">
          <p className="font-bold mb-2">Tối thiểu:</p>
          <ul className="space-y-1 ml-4 md:ml-8">
            <li>Yêu cầu bộ xử lý và hệ điều hành 64 bit</li>
            <li>
              <span className="font-semibold">Hệ điều hành: </span>{" "}
              {details.system_requirements.minimum.os}
            </li>
            <li>
              <span className="font-semibold">Bộ xử lý: </span>{" "}
              {details.system_requirements.minimum.processor}
            </li>
            <li>
              <span className="font-semibold">Ký ức: </span>{" "}
              {details.system_requirements.minimum.memory}
            </li>
            <li>
              <span className="font-semibold">Đồ họa: </span>{" "}
              {details.system_requirements.minimum.graphics}
            </li>
            <li>
              <span className="font-semibold">DirectX: </span>{" "}
              {details.system_requirements.minimum.directx}
            </li>
            <li>
              <span className="font-semibold">Kho: </span>{" "}
              {details.system_requirements.minimum.storage}
            </li>
            <li>
              <span className="font-semibold">Thẻ âm thanh: </span>{" "}
              {details.system_requirements.minimum.sound_card}
            </li>
          </ul>
        </div>
      </div>

      <hr className="mb-10 border-gray-200" />

      {/* SECTION: Chính sách bảo hành */}
      <div className="grid grid-cols-1 md:grid-cols-[250px_1fr] gap-4 mb-10">
        <h2 className="text-xl font-bold text-gray-800">Chính sách bảo hành</h2>
        <div
          className="text-[14.5px] prose prose-sm max-w-none prose-ul:list-disc prose-li:mb-1"
          dangerouslySetInnerHTML={{ __html: details.warranty_policy }}
        />
      </div>

      <hr className="mb-10 border-gray-200" />

      {/* SECTION 3: Câu hỏi thường gặp */}
      <div className="grid grid-cols-1 md:grid-cols-[250px_1fr] gap-4">
        <h2 className="text-xl font-bold text-gray-800">Câu hỏi thường gặp</h2>
        <div className="space-y-6">
          {details.faq_list.map((faq, index) => (
            <div key={index} className="text-[14.5px]">
              <h3 className="font-bold text-gray-900 mb-1">
                {index + 1}. {faq.question}
              </h3>
              <p
                className="text-gray-700 leading-normal"
                dangerouslySetInnerHTML={{ __html: faq.answer }}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductInformation;
