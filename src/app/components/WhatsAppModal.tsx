import whatsappQR from "../../assets/images/whatsapp-qr.jpeg.jpeg";

type WhatsAppModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

export default function WhatsAppModal({
  isOpen,
  onClose,
}: WhatsAppModalProps) {
  if (!isOpen) return null;

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
          textAlign: "center",
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

        <h2
          style={{
            margin: 0,
            fontSize: "28px",
          }}
        >
          Join Designers Colony
        </h2>

        <p
          style={{
            color: "#666",
            fontSize: "15px",
            marginTop: "10px",
            marginBottom: "22px",
            lineHeight: 1.5,
          }}
        >
          Get instant UX/Product design jobs, community discussions,
          and curated opportunities.
        </p>

        <a
          href="https://chat.whatsapp.com/IWd37n18WgJAA2Oy2nPaLN"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: "inline-block",
            padding: "12px 22px",
            border: "1px solid #111",
            borderRadius: "999px",
            textDecoration: "none",
            color: "#111",
            fontWeight: 600,
            marginBottom: "20px",
          }}
        >
          Join WhatsApp Community
        </a>

        <div
          style={{
            borderTop: "1px solid #F1F1F1",
            paddingTop: "20px",
          }}
        >
          <p
            style={{
              fontSize: "13px",
              color: "#888",
              marginBottom: "14px",
            }}
          >
            Or scan this QR code
          </p>

          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <img
              src={whatsappQR}
              alt="WhatsApp QR"
              style={{
                width: "180px",
                height: "180px",
                objectFit: "cover",
                borderRadius: "12px",
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}