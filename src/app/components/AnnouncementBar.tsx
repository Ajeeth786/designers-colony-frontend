import { useState } from "react";
import WhatsAppModal from "./WhatsAppModal";
import EmailSubscribeModal from "./EmailSubscribeModal";

export default function AnnouncementBar() {
  const [showWhatsApp, setShowWhatsApp] = useState(false);
  const [showEmail, setShowEmail] = useState(false);

  return (
    <>
      <div
        style={{
          background: "#FFFFFF",
          borderTop: "1px solid #EAEAEA",
          height: "56px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "14px",
          position: "fixed",
          bottom: 0,
          left: 0,
          width: "100%",
          zIndex: 2000,
          padding: "0 16px",
          boxSizing: "border-box",
          boxShadow: "0 -2px 10px rgba(0,0,0,0.04)",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
            flexWrap: "wrap",
            justifyContent: "center",
            textAlign: "center",
          }}
        >
          <span style={{ color: "#444" }}>
          🚀 Join a community of 500+ UX & Product designers
          </span>

          <button
            onClick={() => setShowWhatsApp(true)}
            style={{
              border: "1px solid #111",
              background: "#fff",
              cursor: "pointer",
              borderRadius: "999px",
              padding: "8px 14px",
              fontSize: "13px",
              fontWeight: 500,
            }}
          >
            Join WhatsApp
          </button>

          <button
            onClick={() => setShowEmail(true)}
            style={{
              border: "none",
              background: "#111",
              color: "#fff",
              cursor: "pointer",
              borderRadius: "999px",
              padding: "8px 14px",
              fontSize: "13px",
              fontWeight: 500,
            }}
          >
            Email Alerts
          </button>
        </div>
      </div>

      <WhatsAppModal
        isOpen={showWhatsApp}
        onClose={() => setShowWhatsApp(false)}
      />

      <EmailSubscribeModal
        isOpen={showEmail}
        onClose={() => setShowEmail(false)}
      />
    </>
  );
}