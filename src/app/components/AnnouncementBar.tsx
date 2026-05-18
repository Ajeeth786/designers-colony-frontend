import { useState, useEffect } from "react";
import WhatsAppModal from "./WhatsAppModal";
import EmailSubscribeModal from "./EmailSubscribeModal";

export default function AnnouncementBar() {
  const [showWhatsApp, setShowWhatsApp] = useState(false);
  const [showEmail, setShowEmail] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkScreen = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkScreen();
    window.addEventListener("resize", checkScreen);

    return () => window.removeEventListener("resize", checkScreen);
  }, []);

  return (
    <>
      <div
        style={{
          background: "#FFFFFF",
          borderTop: "1px solid #EAEAEA",
          position: "fixed",
          bottom: 0,
          left: 0,
          width: "100%",
          zIndex: 2000,
          padding: isMobile ? "10px 12px" : "12px 24px",
          boxSizing: "border-box",
          boxShadow: "0 -2px 10px rgba(0,0,0,0.04)",
        }}
      >
        <div
          style={{
            maxWidth: "1120px",
            margin: "0 auto",
            display: "flex",
            flexDirection: isMobile ? "column" : "row",
            gap: isMobile ? "10px" : "18px",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <span
            style={{
              color: "#444",
              fontWeight: 500,
              fontSize: isMobile ? "13px" : "14px",
              textAlign: "center",
              whiteSpace: isMobile ? "normal" : "nowrap",
            }}
          >
            🚀 Join a community of 500+ UX & Product designers
          </span>

          <div
            style={{
              display: "flex",
              gap: "10px",
              width: isMobile ? "100%" : "auto",
              justifyContent: "center",
            }}
          >
            <button
              onClick={() => setShowWhatsApp(true)}
              style={{
                flex: isMobile ? 1 : "unset",
                border: "1px solid #111",
                background: "#fff",
                cursor: "pointer",
                borderRadius: "999px",
                padding: "10px 18px",
                fontSize: "13px",
                fontWeight: 500,
              }}
            >
              Join WhatsApp
            </button>

            <button
              onClick={() => setShowEmail(true)}
              style={{
                flex: isMobile ? 1 : "unset",
                border: "none",
                background: "#111",
                color: "#fff",
                cursor: "pointer",
                borderRadius: "999px",
                padding: "10px 18px",
                fontSize: "13px",
                fontWeight: 500,
              }}
            >
              Email Alerts
            </button>
          </div>
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