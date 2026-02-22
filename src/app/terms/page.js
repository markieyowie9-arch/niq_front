"use client";
import CustomerLayout from "@/components/layouts/CostumerLayout";

export default function Terms() {
  return (
    <CustomerLayout>
      <div className="row justify-content-center">
        <div className="col-md-8">
          <h1 className="mb-4">Terms and Conditions</h1>

          <div className="card">
            <div className="card-body">
              <h5>1. Acceptance of Terms</h5>
              <p>
                By accessing and using this website, you accept and agree to be
                bound by the terms and provision of this agreement.
              </p>

              <h5 className="mt-4">2. Products and Services</h5>
              <p>
                Ni-Q Cleaning Solutions provides cleaning products including but
                not limited to detergent soaps, dishwashing soaps, car shampoos,
                and bleaches. All products are manufactured and mixed by Ni-Q
                Cleaning Solutions.
              </p>

              <h5 className="mt-4">3. Orders and Payments</h5>
              <p>
                All orders placed through this website are subject to acceptance
                and availability. Payment must be received in full before order
                processing begins. We accept payments through GCash, PayMaya,
                Bank Transfer, and PayPal.
              </p>

              <h5 className="mt-4">4. Shipping and Delivery</h5>
              <p>
                Delivery is available within the Philippines only. Shipping
                costs are calculated based on location and order value. Delivery
                times are estimates and not guaranteed.
              </p>

              <h5 className="mt-4">5. Cancellations and Returns</h5>
              <p>
                Orders can be cancelled before production begins. For bulk
                orders, cancellations must be made before production starts.
                Returns are accepted for damaged products only.
              </p>

              <h5 className="mt-4">6. Privacy and Data Protection</h5>
              <p>
                We collect and store personal information necessary for order
                processing and delivery. Your data will not be shared with third
                parties without your consent.
              </p>

              <h5 className="mt-4">7. Changes to Terms</h5>
              <p>
                Ni-Q Cleaning Solutions reserves the right to modify these terms
                at any time. Continued use of the website constitutes acceptance
                of modified terms.
              </p>

              <div className="alert alert-info mt-4">
                <strong>Last Updated:</strong> February 2024
              </div>
            </div>
          </div>
        </div>
      </div>
    </CustomerLayout>
  );
}
