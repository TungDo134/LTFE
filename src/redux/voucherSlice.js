import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getVoucherByCodeApi } from "../services/apiVoucher";

export const applyVoucher = createAsyncThunk(
    "voucher/apply",
    async (code, { rejectWithValue }) => {
        const res = await getVoucherByCodeApi(code);

        if (res.data.length === 0) {
            return rejectWithValue("Mã giảm giá không hợp lệ");
        }

        return res.data[0];
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
                state.voucher = action.payload;
                state.error = null;
            })
            .addCase(applyVoucher.rejected, (state, action) => {
                state.error = action.payload;
                state.voucher = null;
                state.discount = 0;
            });
    },
});

export const { clearVoucher } = voucherSlice.actions;
export default voucherSlice.reducer;
