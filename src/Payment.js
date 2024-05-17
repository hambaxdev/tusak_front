import { useEffect, useState } from "react";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";
import { loadStripe } from "@stripe/stripe-js";

function Payment() {
  const [clientSecret, setClientSecret] = useState("");
  const [publishableKey, setPublishableKey] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/config")
      .then(async (r) => {
        if (!r.ok) {
          throw new Error(`Failed to fetch config: ${r.statusText}`);
        }
        const { publishableKey } = await r.json();
        console.log("Fetched publishableKey:", publishableKey);
        setPublishableKey(publishableKey);
      })
      .catch((error) => {
        console.error("Error fetching publishable key:", error);
      })
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    if (publishableKey) {
      fetch("/create-payment-intent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({}),
      })
        .then(async (result) => {
          if (!result.ok) {
            throw new Error(`Failed to create payment intent: ${result.statusText}`);
          }
          const { clientSecret } = await result.json();
          console.log("Fetched clientSecret:", clientSecret);
          setClientSecret(clientSecret);
        })
        .catch((error) => {
          console.error("Error fetching client secret:", error);
        });
    }
  }, [publishableKey]);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <h1 style={{ textAlign: "center" }}>Купить билет</h1>
      {clientSecret && publishableKey && (
        <Elements stripe={loadStripe(publishableKey)} options={{ clientSecret }}>
          <CheckoutForm />
        </Elements>
      )}
    </>
  );
}

export default Payment;
