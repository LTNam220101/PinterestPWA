import React, { Dispatch, SetStateAction, useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { saveAs } from "file-saver";
import { ReactComponent as Close } from "assets/svg/close.svg";
import { ReactComponent as Pin } from "assets/svg/pin.svg";
import { ReactComponent as Share } from "assets/svg/share2.svg";
import { ReactComponent as Save } from "assets/svg/save.svg";
import { ReactComponent as Add } from "assets/svg/add.svg";
import { ReactComponent as Delete } from "assets/svg/delete.svg";
import { deletePin } from "components/Pin/actions";
import { State } from "redux-saga/reducers";
import { createToastSuccess } from "screens/Home/actions";
import { DELETE_PIN_CLEAR } from "components/Pin/reducers";
import "./styles.scss";

interface ModalProps {
  inProfile?: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  pinId?: number;
  src?: string;
}

const Modal = ({ inProfile, setIsOpen, pinId, src }: ModalProps) => {
  const { boardId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [save, setSave] = useState(false);
  const [selectedImg, setSelectedImg] = useState<File | undefined>(undefined);

  const deletePinResult = useSelector((state: State) => state.deletePinResult);

  useEffect(() => {
    if (selectedImg) navigate("/board/update", { state: { img: selectedImg } });
  }, [selectedImg]);

  useEffect(() => {
    if (deletePinResult) {
      if (deletePinResult.success) {
        dispatch(createToastSuccess({ title: "Delete pin succeed!" }));
      } else if (deletePinResult.error) {
        dispatch(createToastSuccess({ title: "Delete pin failed!" }));
      }
      navigate(-1);
      return () => {
        dispatch({
          type: DELETE_PIN_CLEAR
        });
      };
    }
  }, [deletePinResult]);

  // const downloadImage = () => {
  //   saveAs("https://httpbin.org/image", "image.jpg"); // Put your image url here.
  // };

  return (
    <>
      <div className="modal-background" onClick={() => setIsOpen(false)}></div>
      <div className="modal">
        <div className="modal-header">
          <Close className="header-button" onClick={() => setIsOpen(false)} />
          <div className="header-text">
            {inProfile ? "Th??m v??o h??? s??" : save ? "L??u v??o b???ng" : "Tu??? ch???n"}
          </div>
        </div>
        <div className="modal-buttons">
          {inProfile ? (
            <>
              <div className="img-picker-text">
                ???nh
                <input
                  id="upload-pin"
                  type="file"
                  accept="image/*"
                  className="img-picker"
                  onChange={(e) => {
                    if (e.target.files) setSelectedImg(e.target.files[0]);
                  }}
                ></input>
              </div>
              <div onClick={() => navigate("/board/create")}>B???ng</div>
            </>
          ) : save ? (
            <>
              <div className="modal-board">
                <img
                  src="https://i.pinimg.com/236x/6a/71/ef/6a71efd53f8304a47e555404f6758054.jpg"
                  className="modal-img"
                  alt=""
                />
                G???u b???c c???c
              </div>
              <div className="modal-board">
                <img
                  src="https://i.pinimg.com/236x/6a/71/ef/6a71efd53f8304a47e555404f6758054.jpg"
                  className="modal-img"
                  alt=""
                />
                G???u b???c c???c
              </div>
              <div className="modal-board">
                <img
                  src="https://i.pinimg.com/236x/6a/71/ef/6a71efd53f8304a47e555404f6758054.jpg"
                  className="modal-img"
                  alt=""
                />
                G???u b???c c???c
              </div>
              <div
                className="create-board"
                onClick={() => navigate("/board/create")}
              >
                <Add className="create-icon" />
                T???o b???ng
              </div>
            </>
          ) : (
            <>
              <div className="button" onClick={() => setSave(true)}>
                <Pin className="button-icon" />
                L??u
              </div>
              <div
                className="button"
                onClick={() =>
                  pinId &&
                  dispatch(deletePin({ boardId: boardId, pinId: pinId }))
                }
              >
                <Delete className="button-icon" />
                Xo?? kh???i b???ng
              </div>
              <div className="button">
                <Share className="button-icon" />
                G???i
              </div>
              {/* <div className="button" onClick={downloadImage}>
                <Save className="button-icon" />
                T???i h??nh ???nh xu???ng
              </div> */}
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Modal;
