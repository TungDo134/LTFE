import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getVoucherByCodeApi } from "../services/apiVoucher";

export const applyVoucher = createAsyncThunk(
    "voucher/apply",
    async ({ code, total }, { rejectWithValue }) => {
        try {
            const res = await getVoucherByCodeApi(code);
            const voucher = res.data;

            if (voucher.expired) {
                return rejectWithValue("Voucher đã hết hạn");
            }

            if (total < voucher.minOrder) {
                return rejectWithValue("Đơn hàng chưa đủ điều kiện");
            }

            let discount = 0;

            if (voucher.type === "percent") {
                discount = (total * voucher.value) / 100;
                if (voucher.maxDiscount) {
                    discount = Math.min(discount, voucher.maxDiscount);
                }
            } else {
                discount = voucher.value;
            }

            return {
                voucher,
                discount,
            };
        } catch {
            return rejectWithValue("Voucher không tồn tại");
        }
    }
);

const voucherSlice = createSlice({
    name: "voucher",
    initialState: {
        voucher: null,
        discount: 0,
        error: null,
    },
    reducers: {
        clearVoucher(state) {
            state.voucher = null;
            state.discount = 0;
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(applyVoucher.fulfilled, (state, action) => {
                state.voucher = action.payload.voucher;
                state.discount = action.payload.discount;
                state.error = null;
            })
            .addCase(applyVoucher.rejected, (state, action) => {
                state.error = action.payload;
            });
    },
});

export const { clearVoucher } = voucherSlice.actions;
export default voucherSlice.reducer;
