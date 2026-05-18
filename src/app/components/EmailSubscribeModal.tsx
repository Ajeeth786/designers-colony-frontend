import { useState } from "react";
import { supabase } from "../../lib/supabase";

type EmailSubscribeModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

export default function EmailSubscribeModal({
  isOpen,
  onClose,
}: EmailSubscribeModalProps) {
  const [email, setEmail] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSubscribe = async () => {
    if (!email) return;

    const { error } = await supabase
      .from("email_subscribers")
      .insert([{ email }]);

    if (error) {
      if (error.code === "23505") {
        alert("This email is already subscribed.");
      } else {
        alert("Something went wrong. Try again.");
      }
      return;
    }

    setIsSuccess(true);
    setEmail("");
  };

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,0.45)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 3000,
        padding: "16px",
      }}
    >
      <div
        style={{
          background: "#fff",
          borderRadius: "20px",
          padding: "28px",
          width: "420px",
          maxWidth: "100%",
          position: "relative",
          boxShadow: "0 10px 30px rgba(0,0,0,0.12)",
        }}
      >
        <button
          onClick={onClose}
          style={{
            position: "absolute",
            top: "16px",
            right: "16px",
            border: "none",
            background: "transparent",
            cursor: "pointer",
            fontSize: "22px",
            color: "#666",
          }}
        >
          ✕
        </button>

        {!isSuccess ? (
          <>
            <h2
              style={{
                margin: 0,
                fontSize: "28px",
                textAlign: "center",
              }}
            >
              Subscribe to Email Alerts
            </h2>

            <p
              style={{
                color: "#666",
                fontSize: "15px",
                marginTop: "10px",
                marginBottom: "22px",
                textAlign: "center",
              }}
            >
              Get curated design jobs. No spam.
            </p>

            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{
                width: "100%",
                padding: "14px",
                border: "1px solid #ddd",
                borderRadius: "12px",
                marginBottom: "16px",
                boxSizing: "border-box",
                fontSize: "15px",
              }}
            />

            <button
              onClick={handleSubscribe}
              style={{
                width: "100%",
                padding: "14px",
                background: "#111",
                color: "#fff",
                border: "none",
                borderRadius: "12px",
                cursor: "pointer",
                fontSize: "15px",
                fontWeight: 600,
              }}
            >
              Subscribe
            </button>
          </>
        ) : (
          <div
            style={{
              textAlign: "center",
              padding: "20px 10px",
            }}
          >
            <div style={{ fontSize: "42px", marginBottom: "12px" }}>
              🎉
            </div>

            <h2
              style={{
                margin: 0,
                fontSize: "26px",
              }}
            >
              Thanks for joining!
            </h2>

            <p
              style={{
                color: "#666",
                fontSize: "15px",
                marginTop: "12px",
                lineHeight: 1.6,
              }}
            >
              No spam — we’ll send curated UX/Product design jobs weekly.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}