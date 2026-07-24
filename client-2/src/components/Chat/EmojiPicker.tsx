import React from "react";
import { EmojiKeyboard } from "reactjs-emoji-keyboard";

const EmojiPicker = ({ onEmojiClick }) => {
  const getEmojiIcoin = (icon) => {
    onEmojiClick(icon);
  };

  return (
    <EmojiKeyboard
      height={320}
      width="100%"
      theme="dark"
      searchLabel="Procurar emoji"
      searchDisabled={true}
      onEmojiSelect={(emoji) => getEmojiIcoin(emoji.character)}
      categoryDisabled={false}
    />
  );
};

export default EmojiPicker;
