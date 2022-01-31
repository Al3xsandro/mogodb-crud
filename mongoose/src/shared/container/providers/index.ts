import { container } from "tsyringe";

import { StripeGateway } from "./stripe/implementations/Stripe";
import { IStripeGateway } from "./stripe/IStripe";

container.registerSingleton<IStripeGateway>("StripeProvider", StripeGateway);