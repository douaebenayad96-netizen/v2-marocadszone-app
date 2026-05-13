import dayjs from "dayjs";
import { FC } from "react";
import { AiResponse } from "../../utils/AiResponse";

// Typing indicator component
const TypingIndicator = () => (
  <div className="flex items-center space-x-1">
    <div
      className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
      style={{ animationDelay: "0ms" }}
    ></div>
    <div
      className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
      style={{ animationDelay: "150ms" }}
    ></div>
    <div
      className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
      style={{ animationDelay: "300ms" }}
    ></div>
  </div>
);

interface MessageBoxProps {
  message?: string;
  aiResponse?: string;
  date: string;
  isAiResponseLoading: boolean;
  messageId: string;
  currentPendingId: string | null;
}

const MessageBox: FC<MessageBoxProps> = ({
  message,
  aiResponse,
  date,
  isAiResponseLoading,
  messageId,
  currentPendingId,
}) => {
  const isThisMessageGenerating =
    isAiResponseLoading && messageId === currentPendingId;

  return (
    <div className="space-y-4" onClick={(e) => e.stopPropagation()}>
      {/* User Message */}
      {message && (
        <div className="flex justify-end">
          <div className="max-w-xs lg:max-w-md bg-blue-500 text-white rounded-lg px-4 py-2 shadow-sm">
            <p className="text-sm">{message}</p>
            <span className="text-xs opacity-75 block text-right mt-1">
              {dayjs(date).format("HH:mm")}
            </span>
          </div>
        </div>
      )}

      {/* AI Response or Loading State */}
      {(aiResponse || isThisMessageGenerating) && (
        <div className="flex justify-start">
          <div className="max-w-xs lg:max-w-md bg-gray-100 text-gray-800 rounded-lg px-4 py-2 shadow-sm">
            {isThisMessageGenerating && !aiResponse ? (
              // Show typing indicator only for the message currently being generated
              <div className="flex items-center space-x-2 py-1">
                <span className="text-sm text-gray-500">Assistant écrit</span>
                <TypingIndicator />
              </div>
            ) : (
              // Show the actual AI response
              <>
                <p className="text-sm">
                  <AiResponse text={aiResponse || ""} />
                </p>
                <span className="text-xs text-gray-500 block text-right mt-1">
                  {dayjs(date).format("HH:mm")}
                </span>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default MessageBox;
