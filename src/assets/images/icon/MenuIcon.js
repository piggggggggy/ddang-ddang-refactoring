export default function MenuIcon({ size = "small" }) {
    return (
        <>
            {size === "medium" ? (
                <svg
                    width="24"
                    height="18"
                    viewBox="0 0 24 18"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <rect width="24" height="2" fill="white" />
                    <rect y="8" width="24" height="2" fill="white" />
                    <rect y="16" width="24" height="2" fill="white" />
                </svg>
            ) : (
                <svg
                    width="16"
                    height="13"
                    viewBox="0 0 16 13"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <rect width="16" height="1" fill="#969696" />
                    <rect y="12" width="16" height="1" fill="#969696" />
                    <rect y="6" width="16" height="1" fill="#969696" />
                </svg>
            )}
        </>
    );
}
