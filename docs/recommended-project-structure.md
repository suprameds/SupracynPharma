# Recommended Project Structure

src/
  app/
  components/
    ui/
    shared/
  features/
    orders/
    prescriptions/
    users/
  lib/
    utils/
    validations/
  server/
    services/
    repositories/
  types/

Why:
- feature grouping helps scale
- shared UI stays separate
- backend logic is not mixed into route files
- validation and types are easy to discover
