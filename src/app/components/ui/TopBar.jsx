export default function TopBar({ onJoinClick }) {
    return (
      <div style={styles.bar}>
        <p style={styles.text}>
          Join 500+ designers getting UI/UX jobs weekly 🚀
        </p>
  
        <button style={styles.button} onClick={onJoinClick}>
          Join Free
        </button>
      </div>
    );
  }
  
  const styles = {
    bar: {
      position: "fixed",
      top: 0,
      left: 0,
      width: "100%",
      background: "#000",
      color: "#fff",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      gap: "16px",
      padding: "10px",
      zIndex: 1000,
    },
    text: {
      margin: 0,
      fontSize: "14px",
    },
    button: {
      background: "#fff",
      color: "#000",
      border: "none",
      padding: "6px 12px",
      borderRadius: "6px",
      cursor: "pointer",
      fontWeight: "500",
    },
  };