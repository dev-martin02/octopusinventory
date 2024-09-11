import React from "react";
import { AlertCircle, CheckCircle, XCircle } from "lucide-react";

interface AlertMessageProps {
  message: string;
}

export function AlertMessage({ message }: AlertMessageProps) {
  const getAlertConfig = (message: string) => {
    switch (message) {
      case "update":
        return {
          className: "bg-blue-100 border-blue-500 text-blue-700",
          icon: <AlertCircle className="w-5 h-5" />,
          title: "Updated",
          content: "A product has been updated successfully!",
        };
      case "success":
        return {
          className: "bg-green-100 border-green-500 text-green-700",
          icon: <CheckCircle className="w-5 h-5" />,
          title: "Success",
          content: "New product has been added successfully!",
        };
      default:
        return {
          className: "bg-red-100 border-red-500 text-red-700",
          icon: <XCircle className="w-5 h-5" />,
          title: "Error",
          content: `There was an error: ${message}`,
        };
    }
  };

  const config = getAlertConfig(message);

  return (
    <div
      role="alert"
      className={`fixed top-4 left-1/2 transform -translate-x-1/2 w-full max-w-sm border-l-4 p-4 shadow-md rounded-r-lg ${config.className} transition-all duration-500 ease-in-out animate-slideDown`}
    >
      <div className="flex items-center">
        {config.icon}
        <div className="ml-3">
          <h3 className="font-medium">{config.title}</h3>
          <p className="text-sm mt-1">{config.content}</p>
        </div>
      </div>
    </div>
  );
}
