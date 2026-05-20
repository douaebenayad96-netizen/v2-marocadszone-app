/* eslint-disable no-unused-vars */

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useMutation, useQueryClient } from "react-query";
import { toast } from "react-toastify";

import { AiBot } from "../../assets/icons/AiBot";
import { Close } from "../../assets/icons/Close";
import { IconTrash } from "../../assets/icons/IconTrash";
import { MicIcon } from "../../assets/icons/MicIcon";
import { PauseIcon } from "../../assets/icons/PauseIcon";
import { PlayIcon } from "../../assets/icons/PlayIcon";
import { SendIcon } from "../../assets/icons/SendIcon";
import { StopIcon } from "../../assets/icons/StopIcon";
import { generateConversationWithAi } from "../../services/api/ai";
import MessageBox from "./MessageBox";

interface FormValues {
  message: string;
  audio: Blob | null;
}

interface Conversation {
  id: string;
  from: "user" | "assistant";
  prompt: string;
  createdAt: string;
}

interface RecordedAudio {
  blob: Blob;
  url: string;
}

const ChatBot = () => {
  const [conversationData, setConversationData] = useState<Conversation[]>([]);
  const [open, setOpen] = useState<boolean>(false);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [pendingMessageId, setPendingMessageId] = useState<string | null>(null);

  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [recordedAudio, setRecordedAudio] = useState<RecordedAudio | null>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [recordingTime, setRecordingTime] = useState<number>(0);
  const [audioMode, setAudioMode] = useState<boolean>(false);

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const audioRef = useRef<HTMLAudioElement>(null);
  const recordingIntervalRef = useRef<NodeJS.Timeout | null>(null);

  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === "ar";
  const queryClient = useQueryClient();

  const { register, handleSubmit, reset, watch, setValue } = useForm<FormValues>({
    defaultValues: {
      message: "",
      audio: null,
    },
  });

  // Mutation
  const { mutate: SendDataToAi, isPending } = useMutation({
    mutationFn: (data: { prompts: { from: string; prompt: string }[] }) =>
      generateConversationWithAi(data),

    onMutate: (variables) => {
      const tempId = `temp-${Date.now()}`;
      setPendingMessageId(tempId);

      const lastMessage = variables.prompts[variables.prompts.length - 1];

      if (lastMessage && lastMessage.from === "user") {
        const newUserMessage: Conversation = {
          id: tempId,
          from: "user",
          prompt: lastMessage.prompt,
          createdAt: new Date().toISOString(),
        };

        setConversationData((prev) => [...prev, newUserMessage]);
      }

      return { tempId };
    },
    onSuccess: (response, variables, context) => {
      if (response?.data && Array.isArray(response.data)) {
        const backendConversation = response.data;

        setConversationData((prev) => {
          const existingMessages = prev.filter(
            (item) => !item.id.startsWith("temp-")
          );

          const newMessages = backendConversation.filter((backendMsg: any) => {
            return !existingMessages.some(
              (existingMsg) =>
                existingMsg.from === backendMsg.from &&
                existingMsg.prompt === backendMsg.prompt
            );
          });

          const formattedNewMessages: Conversation[] = newMessages.map(
            (msg: any, index: number) => ({
              id: `${msg.from}-${Date.now()}-${index}-${Math.random()
                .toString(36)
                .substr(2, 9)}`,
              from: msg.from as "user" | "assistant",
              prompt: msg.prompt || "",
              createdAt: msg.createdAt || new Date().toISOString(),
            })
          );

          return [...existingMessages, ...formattedNewMessages];
        });
      }

      setPendingMessageId(null);
      reset();
      queryClient.invalidateQueries({ queryKey: ["AllUserConversation"] });
    },
    onError: (error: Error, variables, context) => {
      console.error("❌ API Error:", error);
      setPendingMessageId(null);

      setConversationData((prev) =>
        prev.filter((item) => !item.id.startsWith("temp-"))
      );

      toast.error(t("chatbot.error_sending", "Erreur lors de l'envoi du message"));
    },
  });

  const onSubmit = async (data: FormValues) => {
    if (!data.message.trim()) {
      toast.error(t("chatbot.enter_message", "Veuillez entrer un message"));
      return;
    }

    const validConversations = conversationData.filter(
      (item) => !item.id.startsWith("temp-")
    );

    const prompts = validConversations.map((item) => ({
      from: item.from,
      prompt: item.prompt,
    }));

    prompts.push({
      from: "user",
      prompt: data.message.trim(),
    });

    SendDataToAi({ prompts });
  };

  const handleClick = (question: string) => {
    const validConversations = conversationData.filter(
      (item) => !item.id.startsWith("temp-")
    );

    const prompts = validConversations.map((item) => ({
      from: item.from,
      prompt: item.prompt,
    }));

    prompts.push({
      from: "user",
      prompt: question,
    });

    SendDataToAi({ prompts });
  };

  const startRecording = async (e?: React.MouseEvent<HTMLButtonElement>) => {
    e?.stopPropagation();
    e?.preventDefault();

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];

      mediaRecorder.ondataavailable = (event: BlobEvent) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: "audio/webm" });
        const audioUrl = URL.createObjectURL(audioBlob);
        setRecordedAudio({ blob: audioBlob, url: audioUrl });
        setValue("audio", audioBlob);
        stream.getTracks().forEach((track) => track.stop());
      };

      mediaRecorder.start(100);
      setIsRecording(true);
      setRecordingTime(0);

      recordingIntervalRef.current = setInterval(() => {
        setRecordingTime((prev) => prev + 1);
      }, 1000);
    } catch (error) {
      console.error("Recording error:", error);
      toast.error(t("chatbot.microphone_error", "Erreur d'accès au microphone"));
      setIsRecording(false);
    }
  };

  const stopRecording = (e?: React.MouseEvent<HTMLButtonElement>) => {
    e?.stopPropagation();
    e?.preventDefault();

    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      if (recordingIntervalRef.current) {
        clearInterval(recordingIntervalRef.current);
      }
    }
  };

  const playRecordedAudio = (e?: React.MouseEvent<HTMLButtonElement>) => {
    e?.stopPropagation();
    e?.preventDefault();

    if (recordedAudio && audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        audioRef.current.play();
        setIsPlaying(true);
      }
    }
  };

  const clearAudioRecording = (e?: React.MouseEvent<HTMLButtonElement>) => {
    e?.stopPropagation();
    e?.preventDefault();

    setRecordedAudio(null);
    setRecordingTime(0);
    setValue("audio", null);
    setAudioMode(false);

    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
    setIsPlaying(false);

    if (isRecording && mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      if (recordingIntervalRef.current) {
        clearInterval(recordingIntervalRef.current);
      }
    }
  };

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  useEffect(() => {
    const handleEnterClicked = (e: KeyboardEvent) => {
      if (
        e.key === "Enter" &&
        !e.shiftKey &&
        document.activeElement === inputRef.current &&
        !audioMode
      ) {
        e.preventDefault();
        handleSubmit(onSubmit)();
      }
    };

    window.addEventListener("keydown", handleEnterClicked);
    return () => window.removeEventListener("keydown", handleEnterClicked);
  }, [handleSubmit, audioMode]);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [conversationData, isPending]);

  useEffect(() => {
    return () => {
      if (recordingIntervalRef.current) {
        clearInterval(recordingIntervalRef.current);
      }
      if (recordedAudio?.url) {
        URL.revokeObjectURL(recordedAudio.url);
      }
    };
  }, [recordedAudio]);

  const currentMessage = watch("message");
  const { ref: registerRef, ...registerRest } = register("message");

  return (
    <div className="relative z-[2147483647]">
      {/* Bouton IABOT - Aligné à gauche pour RTL */}
      {!open && (
        <div
          className={`w-16 h-16 rounded-full bg-primary-orange fixed bottom-20 sm:bottom-8 flex items-center justify-center cursor-pointer hover:opacity-90 transition-opacity shadow-lg ${
            isRTL ? "left-10" : "right-10"
          }`}
          onClick={() => setOpen(true)}
        >
          <AiBot className="text-white w-8 h-8" />
        </div>
      )}

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            className={`w-[320px] md:w-[380px] h-[460px] md:h-[550px] fixed border bottom-8 bg-white rounded-lg shadow-xl z-[9999] flex flex-col ${
              isRTL ? "left-8 md:left-12" : "right-8 md:right-12"
            }`}
          >
            {/* Header - reste identique */}
            <div className="w-full rounded-t-lg flex items-center bg-primary-orange justify-between px-4 py-4 flex-shrink-0">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <AiBot className="text-white w-8 h-8" />
                  <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-400 rounded-full border-2 border-white"></div>
                </div>
                <div className="flex items-start flex-col">
                  <h3 className="text-white text-lg font-semibold">
                    Marocadszone assistant
                  </h3>
                  <span className="text-green-400 text-sm">en ligne</span>
                </div>
              </div>
              <button
                className="p-2 hover:bg-white/10 rounded-full transition-colors"
                onClick={() => setOpen(false)}
              >
                <Close className="w-5 h-5 text-white" />
              </button>
            </div>

            {/* Contenu du chat - reste identique */}
            <div className="flex-1 px-4 py-2 overflow-y-auto" ref={chatContainerRef}>
              <div className="flex flex-col gap-3">
                {conversationData.length === 0 && !isPending && (
                  <div className="space-y-3">
                    <div className="flex justify-start">
                      <div className="max-w-xs bg-gray-100 rounded-lg px-4 py-3 shadow-sm">
                        <p className="text-sm text-gray-700">
                          {t("chatbot.welcome", "Bonjour ! Comment puis-je vous aider aujourd'hui ?")}
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {conversationData.map((item) => (
                  <MessageBox
                    key={item.id}
                    message={item.from === "user" ? item.prompt : undefined}
                    aiResponse={item.from === "assistant" ? item.prompt : undefined}
                    date={item.createdAt}
                    isAiResponseLoading={false}
                    messageId={item.id}
                    currentPendingId={pendingMessageId}
                  />
                ))}

                {isPending && pendingMessageId && (
                  <MessageBox
                    message={undefined}
                    aiResponse={undefined}
                    date={new Date().toISOString()}
                    isAiResponseLoading={true}
                    messageId={pendingMessageId}
                    currentPendingId={pendingMessageId}
                  />
                )}
              </div>
            </div>

            {/* Input Area - reste identique */}
            <div className="px-4 py-3 flex-shrink-0 border-t border-gray-100">
              {audioMode && (
                <div className="mb-3 p-3 bg-gray-50 rounded-lg">
                  {isRecording ? (
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                        <span className="text-sm text-gray-600">
                          {t("chatbot.recording", "Enregistrement...")} {formatTime(recordingTime)}
                        </span>
                      </div>
                      <button
                        onClick={stopRecording}
                        className="p-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
                      >
                        <StopIcon className="w-4 h-4" />
                      </button>
                    </div>
                  ) : recordedAudio ? (
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">
                          {t("chatbot.audio_recorded", "Audio enregistré")} ({formatTime(recordingTime)})
                        </span>
                        <div className="flex items-center gap-1">
                          <button
                            onClick={playRecordedAudio}
                            className="p-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-colors"
                          >
                            {isPlaying ? <PauseIcon className="w-4 h-4" /> : <PlayIcon className="w-4 h-4" />}
                          </button>
                          <button
                            onClick={clearAudioRecording}
                            className="p-2 bg-gray-500 text-white rounded-full hover:bg-gray-600 transition-colors"
                          >
                            <IconTrash className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                      <audio
                        ref={audioRef}
                        src={recordedAudio.url}
                        onEnded={() => setIsPlaying(false)}
                        className="hidden"
                      />
                    </div>
                  ) : (
                    <div className="text-center">
                      <button
                        type="button"
                        onClick={startRecording}
                        className="p-3 bg-primary-orange text-white rounded-full hover:opacity-90 transition-opacity"
                        disabled={isPending}
                      >
                        <MicIcon className="w-6 h-6" />
                      </button>
                      <p className="text-xs text-gray-500 mt-2">
                        {t("chatbot.press_to_record", "Appuyez pour commencer l'enregistrement")}
                      </p>
                    </div>
                  )}
                </div>
              )}

              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="flex items-center gap-2 p-2 border border-gray-300 rounded-lg focus-within:border-blue-500 transition-colors">
                  {!audioMode && (
                    <input
                      ref={(e) => {
                        registerRef(e);
                        inputRef.current = e;
                      }}
                      type="text"
                      placeholder={
                        isPending 
                          ? t("chatbot.sending", "Envoi...") 
                          : t("chatbot.type_message", "Tapez votre message...")
                      }
                      className="flex-1 outline-none text-sm"
                      disabled={isPending}
                      {...registerRest}
                    />
                  )}

                  {audioMode && (
                    <div className="flex-1 text-sm text-gray-500 px-2">
                      {recordedAudio
                        ? t("chatbot.audio_ready", "Audio prêt à être envoyé")
                        : t("chatbot.audio_mode", "Mode audio activé")}
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={
                      isPending ||
                      (audioMode ? !recordedAudio : !watch("message")?.trim())
                    }
                    className="p-2 text-primary-orange hover:bg-blue-50 rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <SendIcon className="w-5 h-5" />
                  </button>
                </div>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ChatBot;