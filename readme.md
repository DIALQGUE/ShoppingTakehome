# Takehome test

## This is a simple cart and coupon system developed for Playtorium takehome test.

#### disclaimer

development timeframe has been adjusted from 5 days to 4 days at the start of day 4 (I was told the reason for this adjustment is for Playtorium side to read code before interviewing) so some features, especially frontend and this readme, might be incomplete and not well-implemented. please understand that I planned for better result but this is also the result I could presented to you in this timeframe.

## Feature

### Backend

- Express API with endpoint to get `products` and `coupons` data from database (in this case, .json file).
- all entities including `product`, `coupon`, and `order` are implented with clean architecture in design and separated as type, entity, and repositories. Ready to adopt with more complex system.
- API explorer with document implemented with `swagger` ready at `/docs` endpoint.
- deploy in dev mode with `yarn dev` in `/server` directory at port 5000.

### Frontend

- simple React with MUI for shopping which includes picking products, coupons, showing order summary, and submit order.
- implemented according to instruction to calculate discount and prevent using coupon from same category. I made assumtion that each category of coupon will calculate from price after apply coupon from category before it.
- still have some bug, some are identified, some aren't.

#### Known bugs

- if not choose coupon from top cagetory to bottom cagetory, net price calculation will be wrong (might be solved with some sorting).
- discount after each step of category is not calculated correctly (might happen because race condition).

## Something I want to improve

- overhaul coupon applying system to always calculate coupon in right order, and keep track or each category discount.
- improve display and move all styles to `ThemeProvider`.
- separate `products` and `coupons` in `Shopping` to dedicated provider for better performance.
- re-implement `/checkout` endpoint in backend to receive only existing coupon id, and create new point coupon when sent from frontend; in other word, separate `coupons` to `couponIds` and `pointCoupon`.
- add diagram for system architecture.
- add document for frontend.
