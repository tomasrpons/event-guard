import React from "react";
import { MotionDiv } from "~/lib/framer";

type TemplateProps = {
  children: React.ReactNode;
};

const Template: React.FC<TemplateProps> = ({ children }) => {
  return (
    <MotionDiv className="container" animate={{ opacity: 1, y: 0 }} initial={{ opacity: 0, y: 40 }}>
      {children}
    </MotionDiv>
  );
};

export default Template;
