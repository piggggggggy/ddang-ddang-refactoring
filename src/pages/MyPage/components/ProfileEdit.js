import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import IconButton from "@mui/material/IconButton";

import ProfilePreview from "../../Sign/Signup/components/ProfilePreview";

const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "200px",
    height: "200px",
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: "50px",
};

export default function BasicModal() {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [preview, setPreview] = React.useState("");

    return (
        <div>
            <Button onClick={handleOpen}>프로필 바꾸기</Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <ProfilePreview src={preview} />

                    {/* <button>프로필 변경</button> */}
                    <label
                        htmlFor="profilelabel"
                        style={{
                            border: "1px solid red",
                            width: "50px",
                            height: "50px",
                            textAlign: "right",
                        }}
                    >
                        <input
                            id="profilelabel"
                            type="file"
                            style={{ display: "none" }}
                        />
                        <IconButton color="primary" aria-label="upload picture">
                            <CameraAltIcon
                                style={{
                                    right: 0,
                                }}
                            />
                        </IconButton>
                    </label>
                </Box>
            </Modal>
        </div>
    );
}
