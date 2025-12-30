const ProductSkeleton = () => {
  return (
    <div className="flex flex-col gap-3">
      {/* Ảnh */}
      <div
        className={`bg-gray-200 animate-pulse aspect-square w-full rounded-xl`}
      ></div>
      {/* Tên sản phẩm */}
      <div className={`bg-gray-200 animate-pulse rounded h-5 w-3/4`}></div>
      {/* Giá */}
      <div className={`bg-gray-200 animate-pulse rounded h-4 w-1/2`}></div>
    </div>
  );
};

export default ProductSkeleton;
