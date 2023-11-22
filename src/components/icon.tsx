"use client";
import React from "react";
import Icon from "@mdi/react";

type MDIIconProps = {
  icon: string;
  size?: number;
  style?: string;
};

const MdiIcon: React.FC<MDIIconProps> = ({ icon, size, style }) => {
  return <Icon path={icon} size={size ?? 24} className={style} />;
};

export default MdiIcon;
