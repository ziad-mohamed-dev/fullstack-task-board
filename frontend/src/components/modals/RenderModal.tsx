"use client";
import { useModalStore } from "@/stores/useModalStore";
import { MouseEvent, ReactNode, useEffect, useRef } from "react";
import TaskEditorModal from "./TaskEditor/TaskEditorModal";
import BoarderEditorModal from "./BoarderEditor/BoarderEditorModal";
import Image from "next/image";
import { close_ring_modal } from "@/constants";

const RenderModal = () => {
  const { type, closeModal } = useModalStore();
  const overlayRef = useRef<HTMLDivElement>(null);

  // HANDLE WHEN THE USER CLICK ESC ON KEYBOARD TO CLOSE THE MODAL
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        closeModal();
      }
    };
    window.addEventListener("keydown", handleEsc);
    return () => {
      window.removeEventListener("keydown", handleEsc);
    };
  }, [closeModal]);

  // ClOSE THE MODAL WHEN CLICKING ON THE OVERLAY
  const handleOverLayClick = (e: MouseEvent<HTMLDivElement>) => {
    if (e.target === overlayRef.current) {
      closeModal();
    }
  };

  if (!type) return null;

  let ModalContent: ReactNode;
  let ModalTitle: "Task details" | "Board details";

  switch (type) {
    case "task":
      ModalTitle = "Task details";
      ModalContent = <TaskEditorModal />;
      break;
    case "board":
      ModalTitle = "Board details";
      ModalContent = <BoarderEditorModal />;
      break;
  }

  return (
    <div
      className="fixed inset-0 z-50 bg-overlay flex justify-end p-6"
      onClick={handleOverLayClick}
      ref={overlayRef}
    >
      <div className="bg-white rounded-2xl w-full sm:w-1/2 flex flex-col p-2">
        <div className="flex justify-between p-2">
          <h2 className="text-task-title font-semibold">{ModalTitle}</h2>
          <button
            className="size-10 border border-border hover:bg-background hover:scale-95 transition duration-200 rounded-lg flex justify-center items-center cursor-pointer"
            onClick={closeModal}
          >
            <Image
              src={close_ring_modal}
              alt="close_ring_modal"
              width={20}
              height={20}
            />
          </button>
        </div>
        <div className="overflow-y-auto p-2 grow-1">{ModalContent}</div>
      </div>
    </div>
  );
};

export default RenderModal;
