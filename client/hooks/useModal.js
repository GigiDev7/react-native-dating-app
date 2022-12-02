import { useState } from "react";

export const useModal = () => {
  const [isModalShown, setIsModalShown] = useState(false);

  const openModal = () => {
    setIsModalShown(true);
  };

  const closeModal = () => {
    setIsModalShown(false);
  };

  return { isModalShown, openModal, closeModal };
};
