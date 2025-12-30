/**
 * Hàm tạo chuỗi ngẫu nhiên theo độ dài mong muốn
 */
const generateRandomString = (length) => {
  const characters = "abcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
};

/**
 * Tạo tài khoản ngẫu nhiên (ví dụ: game_abc123@gmail.com)
 */
export const generateRandomAccount = (prefix = "user_game") => {
  const randomSuffix = generateRandomString(5); // Lấy 5 ký tự ngẫu nhiên
  return `${prefix}_${randomSuffix}@gmail.com`;
};

/**
 * Tạo mật khẩu ngẫu nhiên (kết hợp chữ và số)
 */
export const generateRandomPassword = (length = 8) => {
  const charset =
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%";
  let password = "";
  for (let i = 0; i < length; i++) {
    password += charset.charAt(Math.floor(Math.random() * charset.length));
  }
  return password;
};
