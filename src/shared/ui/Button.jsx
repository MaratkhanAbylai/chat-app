function Button({ children, onClick, loading, ...props }) {
    return (
        <button
            {...props}
            onClick={onClick}
            disabled={loading}
            style={{
                width: "100%",
                padding: "12px",
                borderRadius: "8px",
                background: loading ? "#333" : "#4a00e0",
                color: "#fff",
                border: "none",
                cursor: "pointer",
                marginTop: "12px",
                fontSize: "1rem"
            }}
        >
            {loading ? "Загрузка..." : children}
        </button>
    );
}

export default Button;