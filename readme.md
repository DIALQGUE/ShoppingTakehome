# Takehome test

## This is a simple cart and coupon system developed for a take-home test.

#### disclaimer

development timeframe has been adjusted from 5 days to 4 days at the start of day 4 (I was told the reason for this adjustment is for the examiner side to read code before interviewing) so some features, especially the front end and this readme might be incomplete and not well-implemented. please understand that I planned for a better result but this is also the result I could present to you in this timeframe.

## Feature

### Backend

- Express API with endpoints to get `products` and `coupons` data from the database (in this case, .json file).
- All entities including `product`, `coupon`, and `order` are implemented with clean architecture in design and separated as type, entity, and repositories. Ready to adopt with more complex system.
- API explorer with document implemented with `swagger` ready at the `/docs` endpoint.
- Deploy in dev mode with `yarn dev` in the `/server` directory at port 5000.

### Frontend

- Simple React with MUI for shopping which includes picking products and coupons, showing order summaries, and submitting orders.
- Implemented according to instructions to calculate discount and prevent using multiple coupons from the same category. I made an assumption that each category of coupon will calculate from price after applying a coupon from the category before it.
- Still have some bugs, some are identified, and some aren't.

#### Known bugs

- If not choose a coupon from the top category to the bottom category, the net price calculation will be wrong (might be solved with some sorting).
- Discount after each step of the category is not calculated correctly (might happen because of race conditions).

## Something I want to improve

- Overhaul the coupon applying system to always calculate coupons in the right order, and keep track of each category discount.
- Add a feature to pick the same product multiple times.
- Improve display and move all styles to `ThemeProvider`.
- Separate `products` and `coupons` in `Shopping` to dedicated providers for better performance.
- Re-implement the `/checkout` endpoint in the backend to receive only existing coupon id, and create new point coupons when sent from frontend; in another word, separate `coupons` to `couponIds` and `pointCoupon`.
- Add diagram for system architecture.
- Add document for front end.
