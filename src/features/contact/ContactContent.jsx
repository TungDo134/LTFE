function ContactContent() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-3 grid grid-cols-2 gap-12">
      {/* Map */}
      <div>
        {
          <div className="flex justify-center my-8">
            <iframe
              title="Google Maps"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3725.195852930649!2d105.83602087613681!3d20.98478488065364!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135ac998c4722cf%3A0xea2515d44fb8e874!2sDivine%20Shop!5e0!3m2!1svi!2s!4v1766847300018!5m2!1svi!2s"
              width="600"
              height="450"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="rounded-md shadow-lg"
            ></iframe>
          </div>
        }
      </div>

      {/* Content */}
      <div className="mt-6">
        <h1>DEVINE SHOP</h1>
        <div className="ml-10">
          <ul className="flex flex-col justify-around gap-2 list-disc">
            <li>
              Facebook Fanpage:{" "}
              <strong className="text-[#2579f2]">DEVINE SHOP Vietnam</strong>
            </li>
            <li>
              Kênh TikTok:{" "}
              <strong className="text-[#2579f2]">DEVINE SHOP</strong>
            </li>
            <li>
              Kênh Youtube:{" "}
              <strong className="text-[#2579f2]">DEVINE SHOP Vietnam</strong>
            </li>
            <li>
              Email:{" "}
              <strong className="text-[#2579f2]">cskhdevine@gmail.com</strong>
            </li>
            <li>Địa chỉ: 96 P. Định Công, Phương Liệt, Thanh Xuân, Hà Nội</li>
            <li>
              Giờ làm việc: 6:00 – 22h các ngày trong tuần, cả ngày T7 & CN
            </li>
            <li>
              Nếu ngoài giờ làm việc xin hãy kiên nhẫn chờ đợi chúng tôi sẽ trả
              lời ngay khi nhìn thấy tin nhắn
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default ContactContent;
