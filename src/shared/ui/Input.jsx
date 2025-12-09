function Input({ ...props }) {
    return (
        <input
            {...props}
            style={{
                width: "100%",
                padding: "12px",
                borderRadius: "8px",
                border: "1px solid #444",
                background: "#0f0f12",
                color: "white",
                marginBottom: "12px"
            }}
        />
    );
}

export default Input;