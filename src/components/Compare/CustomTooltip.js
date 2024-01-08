function CustomTooltip({ active, payload, XAxisDataKey, YAxisDataKey }) {
    const YAxisDataKeyName = YAxisDataKey !== 'THD' ? 'SPL' : 'THD'
        
    if (active && payload && payload.length > 0) {
      return (
            <div
                style={{
                    backgroundColor: "#ffffff",
                    border: "1px solid #cccccc",
                    padding: "8px",
                }}
            >
                <p> {`Hz: ${payload[0].payload[XAxisDataKey]}`} </p>
                <p> {`${YAxisDataKeyName}: ${payload[0].payload[YAxisDataKey]}`} </p>
            </div>
      );
    }

    return null;
}

export default CustomTooltip;