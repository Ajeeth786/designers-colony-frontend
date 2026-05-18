export default function SubscribePopup({ show, onClose }) {
    if (!show) return null;
  
    return (
      <div style={styles.overlay}>
        <div style={styles.popup}>
          <button onClick={onClose} style={styles.close}>✕</button>
  
          <h3>Get UX Jobs Weekly 🚀</h3>
  
          <iframe
            src="YOUR_BEEHIIV_EMBED_URL"
            style={{ width: "100%", height: "220px", border: "none" }}
          />
        </div>
      </div>
    );
  }
  
  const styles = {
    overlay: {
      position: "fixed",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      background: "rgba(0,0,0,0.5)",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      zIndex: 2000,
    },
    popup: {
      background: "#fff",
      padding: "20px",
      borderRadius: "12px",
      width: "400px",
      position: "relative",
    },
    close: {
      position: "absolute",
      top: "10px",
      right: "10px",
      border: "none",
      background: "none",
      cursor: "pointer",
    },
  };